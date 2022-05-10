import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import { useReactMediaRecorder } from "react-media-recorder";
import { useDispatch, useSelector } from "react-redux";

import {
  movePiece,
  abortGame,
  resignGame,
  handleDrawOffer
} from "services/gameService";
import transcibeAudio, { ResponseType } from "services/transcibeService";
import {
  InputStatus,
  setInputStatus,
  showRequestErrorToast,
  setIsDrawOffered
} from "store/reducers/uiSlice";

const audioEncoder = require("audio-encoder");

const saveBlob = (() => {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return (blobParam, fileName) => {
    const url = window.URL.createObjectURL(blobParam);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
})();

function Recorder({ setDataHandler, transcribedData, game, setGameHandler }) {
  const dispatch = useDispatch();
  const { key, isKeyPressed } = useSelector((state) => state.board);
  const { isDrawOffered, inputStatus } = useSelector((state) => state.ui);
  const accessToken = useSelector((state) => state.session.accessToken);
  const gameId = useSelector((state) => state.game.id);

  const theme = useTheme();
  const backgroundColor = theme.palette.neutral.darkest;

  const parseMoveAsUCI = (move) => {
    const gameCopy = { ...game };
    gameCopy.move(move, { sloppy: true });
    const playerMove = gameCopy.undo();
    if (playerMove !== null) return `${playerMove.from}${playerMove.to}`;
    return null;
  };

  const sendMoveRequest = async (move) => {
    dispatch(setInputStatus(InputStatus.SEND_MOVE));
    const response = await movePiece(accessToken, gameId, move);
    if (response.status !== 200) {
      dispatch(setInputStatus(InputStatus.MOVE_REJECTED));
      dispatch(showRequestErrorToast(response));
    } else dispatch(setInputStatus(InputStatus.MOVE_SENT));
  };

  const sloppyMoveChecker = (move) => {
    const gameCopy = { ...game };
    const tryMove = gameCopy.move(move, { sloppy: true });
    if (tryMove !== null) return tryMove.san;

    // checks piece moves that might be mistaken as pawn moves
    if (move.length > 2) return null;
    const moves = game.moves();
    const filteredMoves = [];
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].slice(-2) === move) filteredMoves.push(moves[i]);
    }
    // finds a single move that might be correct
    if (filteredMoves.length === 1) return filteredMoves[0];

    // multiple moves are possible, return null because of ambiguity
    return null;
  };

  const Command = {
    ABORT: "abort",
    RESIGN: "resign",
    DRAW_OFFER: "draw",
    DRAW_ACCEPT: "accept draw",
    DRAW_DECLINE: "decline draw"
  };

  const abortGameHandler = async () => {
    const response = await abortGame(accessToken, gameId);
    if (response.status !== 200) dispatch(showRequestErrorToast(response));
  };

  // TODO: test offer, accept, decline
  const offerDrawHandler = async (accept) => {
    if (isDrawOffered) dispatch(setIsDrawOffered(false));
    const response = await handleDrawOffer(accessToken, gameId, accept);
    if (response.status !== 200) dispatch(showRequestErrorToast(response));
  };

  const resignGameHandler = async () => {
    const response = await resignGame(accessToken, gameId);
    if (response.status !== 200) dispatch(showRequestErrorToast(response));
  };

  const commandHandler = (command) => {
    switch (command) {
      case Command.ABORT:
        abortGameHandler();
        break;
      case Command.RESIGN:
        resignGameHandler();
        break;
      case Command.DRAW_OFFER:
        offerDrawHandler("yes");
        break;
      case Command.DRAW_ACCEPT:
        offerDrawHandler("yes");
        break;
      case Command.DRAW_DECLINE:
        offerDrawHandler("no");
        break;
      default:
        break;
    }
  };

  const handleOnStop = async (_, blob) => {
    const buffer = await blob.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(buffer);

    audioEncoder(audioBuffer, "WAV", null, async (blobParam) => {
      //   saveBlob(blobParam, "test.wav");
      const newBuffer = await blobParam.arrayBuffer();
      const byteArray = [...new Int8Array(newBuffer)];

      const response = await transcibeAudio(byteArray);

      if (response.status !== 200) {
        dispatch(setInputStatus(InputStatus.IDLE));
        dispatch(showRequestErrorToast(response));
      } else {
        console.log(response);

        let checkedMove;

        switch (response.data.type) {
          case ResponseType.MOVE:
            checkedMove = sloppyMoveChecker(response.data.value);

            // illegal or ambiguous move
            if (checkedMove === null) {
              setDataHandler(response.data);
              dispatch(setInputStatus(InputStatus.TRANSCRIBE_ERROR));
            } else {
              setDataHandler({ ...response.data, value: checkedMove });
              dispatch(setInputStatus(InputStatus.CONFIRM_MOVE));
              // voice the input
            }
            break;
          case ResponseType.COMMAND:
            setDataHandler({
              ...response.data,
              value: response.data.value.toLocaleLowerCase()
            });
            dispatch(setInputStatus(InputStatus.CONFIRM_COMMAND));
            // voice the input
            break;
          case ResponseType.ERROR:
            setDataHandler(response.data);
            dispatch(setInputStatus(InputStatus.TRANSCRIBE_ERROR));
            break;
          case ResponseType.CONFIRM:
            if (response.data.value === "yes") {
              if (transcribedData.type === ResponseType.MOVE) {
                sendMoveRequest(parseMoveAsUCI(transcribedData.value));
              } else if (transcribedData.type === ResponseType.COMMAND) {
                dispatch(setInputStatus(InputStatus.IDLE));
                commandHandler(transcribedData.value);
              }
            } else if (response.data.value === "no")
              dispatch(setInputStatus(InputStatus.IDLE));
            break;
          default:
            break;
        }
      }
    });
  };

  const { startRecording, stopRecording } = useReactMediaRecorder({
    askPermissionOnMount: true,
    onStop: handleOnStop
  });

  useEffect(() => {
    if (isKeyPressed) {
      dispatch(setInputStatus(InputStatus.RECORD));
      startRecording();
    } else if (!isKeyPressed && inputStatus === InputStatus.RECORD) {
      dispatch(setInputStatus(InputStatus.TRANSCIBE));
      stopRecording();
    }
  }, [isKeyPressed]);

  return (
    <Box>
      <Typography variant="caption">
        Press{" "}
        <code
          style={{
            backgroundColor,
            paddingLeft: "0.25rem",
            paddingRight: "0.25rem",
            borderRadius: "0.25rem"
          }}
        >{`${key}`}</code>{" "}
        to start recording.
      </Typography>
      <br />
      <Typography variant="caption">
        Stop pressing to end the recording.
      </Typography>
    </Box>
  );
}

export default Recorder;
