import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import { useReactMediaRecorder } from "react-media-recorder";
import { useDispatch, useSelector } from "react-redux";

import { movePiece } from "services/gameService";
import transcibeAudio, { ResponseType } from "services/transcibeService";
import {
  InputStatus,
  setInputStatus,
  showRequestErrorToast
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

function Recorder({ setDataHandler, transcribedData }) {
  const dispatch = useDispatch();
  const { key, isKeyPressed } = useSelector((state) => state.board);
  const inputStatus = useSelector((state) => state.ui.inputStatus);
  const accessToken = useSelector((state) => state.session.accessToken);
  const gameId = useSelector((state) => state.game.id);

  const theme = useTheme();
  const backgroundColor = theme.palette.neutral.darkest;

  const sendMoveRequest = async (move) => {
    dispatch(setInputStatus(InputStatus.SEND_MOVE));
    const response = await movePiece(accessToken, gameId, move);
    if (response.status !== 200) {
      dispatch(setInputStatus(InputStatus.MOVE_REJECTED));
      dispatch(showRequestErrorToast(response));
    } else dispatch(setInputStatus(InputStatus.MOVE_SENT));
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

        switch (response.data.type) {
          case ResponseType.MOVE:
            setDataHandler(response.data);
            dispatch(setInputStatus(InputStatus.CONFIRM_MOVE));
            // confirm move
            // voice the input
            break;
          case ResponseType.COMMAND:
            setDataHandler(response.data);
            dispatch(setInputStatus(InputStatus.CONFIRM_COMMAND));
            break;
          case ResponseType.ERROR:
            setDataHandler(response.data);
            dispatch(setInputStatus(InputStatus.TRANSCRIBE_ERROR));
            break;
          case ResponseType.CONFIRM:
            if (response.data.value === "yes") {
              if (transcribedData.type === ResponseType.MOVE)
                console.log(response);
              else if (transcribedData.type === ResponseType.COMMAND)
                console.log(response);
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
