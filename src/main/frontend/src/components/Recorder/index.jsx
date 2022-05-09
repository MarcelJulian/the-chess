import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useReactMediaRecorder } from "react-media-recorder";

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
  const handleOnStop = async (_, blob) => {
    console.log(blob);
    const buffer = await blob.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(buffer);
    console.log(audioBuffer);
    console.log(audioBuffer.getChannelData(0));

    audioEncoder(audioBuffer, "WAV", null, async (blobParam) => {
      //   saveBlob(blobParam, "test.wav");
      console.log(blobParam);
      const newBuffer = await blobParam.arrayBuffer();
      console.log(newBuffer);
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
