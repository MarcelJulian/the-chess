import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useReactMediaRecorder } from "react-media-recorder";
import { useDispatch } from "react-redux";

import transcibeAudio from "services/transcibeService";
import { showRequestErrorToast } from "store/reducers/uiSlice";

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

function Recorder() {
  const dispatch = useDispatch();

  const handleOnStop = async (_, blob) => {
    console.log(blob);
    const buffer = await blob.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(buffer);

    audioEncoder(audioBuffer, "WAV", null, async (blobParam) => {
      //   saveBlob(blobParam, "test.wav");
      console.log(blobParam);
      const newBuffer = await blobParam.arrayBuffer();
      const byteArray = newBuffer.int8Array();
      console.log(newBuffer);

      const response = await transcibeAudio(byteArray);

      if (response.status !== 200) dispatch(showRequestErrorToast(response));
      else console.log(response);
    });
  };

  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    askPermissionOnMount: true,
    onStop: handleOnStop
  });

  return (
    <Box>
      <p>{status}</p>
      <Button onClick={startRecording}>Start Recording</Button>
      <Button onClick={stopRecording}>Stop Recording</Button>
    </Box>
  );
}

export default Recorder;
