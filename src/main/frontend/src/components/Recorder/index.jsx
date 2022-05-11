import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import Fuse from "fuse.js";
import * as fuzzy from "fuzzy/lib/fuzzy";
import { useReactMediaRecorder } from "react-media-recorder";
import { useDispatch, useSelector } from "react-redux";

import {
  movePiece,
  abortGame,
  resignGame,
  handleDrawOffer
} from "services/gameService";
import transcibeAudio, { ResponseType } from "services/transcibeService";
import { setTranscribedData } from "store/reducers/boardSlice";
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

function Recorder({ game }) {
  const dispatch = useDispatch();
  const { key, isKeyPressed, confirmKey, transcribedData } = useSelector(
    (state) => state.board
  );
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
    const moves = game.moves();
    console.log("🚀 moves", moves);

    const fuzzyResult = fuzzy.filter(move, moves);
    console.log("🚀 fuzzyResult", fuzzyResult);

    // exact move
    if (fuzzyResult.find((res) => res === move)) return move;

    // usually for Ne4 => Nxe4
    if (fuzzyResult.length === 1) return fuzzyResult[0].original;

    const fuse = new Fuse(moves, { isCaseSensitive: true });
    const fuseResult = fuse.search(move);
    console.log("🚀 fuseResult", fuseResult);

    // check empry result
    if (fuseResult.length === 0) return null;

    return fuseResult[0]?.item;
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
              dispatch(setTranscribedData(response.data));
              dispatch(setInputStatus(InputStatus.TRANSCRIBE_ERROR));
            } else {
              dispatch(
                setTranscribedData({ ...response.data, value: checkedMove })
              );
              dispatch(setInputStatus(InputStatus.CONFIRM_MOVE));
              // voice the input
            }
            break;
          case ResponseType.COMMAND:
            dispatch(
              setTranscribedData({
                ...response.data,
                value: response.data.value.toLocaleLowerCase()
              })
            );
            dispatch(setInputStatus(InputStatus.CONFIRM_COMMAND));
            // voice the input
            break;
          case ResponseType.ERROR:
            dispatch(setTranscribedData(response.data));
            dispatch(setInputStatus(InputStatus.TRANSCRIBE_ERROR));
            break;
          case ResponseType.CONFIRM:
            if (response.data.value.toLocaleLowerCase() === "yes") {
              if (transcribedData.type === ResponseType.MOVE) {
                sendMoveRequest(parseMoveAsUCI(transcribedData.value));
              } else if (transcribedData.type === ResponseType.COMMAND) {
                dispatch(setInputStatus(InputStatus.IDLE));
                commandHandler(transcribedData.value);
              }
            } else if (response.data.value.toLocaleLowerCase() === "no")
              dispatch(setInputStatus(InputStatus.IDLE));
            break;
          default:
            dispatch(setInputStatus(InputStatus.IDLE));
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
      dispatch(setInputStatus(InputStatus.TRANSCRIBE));
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
      <br />
      <Typography variant="caption">
        Press{" "}
        <code
          style={{
            backgroundColor,
            paddingLeft: "0.25rem",
            paddingRight: "0.25rem",
            borderRadius: "0.25rem"
          }}
        >{`${confirmKey}`}</code>{" "}
        to confirm your move.
      </Typography>
    </Box>
  );
}

export default Recorder;
