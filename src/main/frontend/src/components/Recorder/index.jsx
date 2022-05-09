/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-bitwise */
import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import { fileTypeFromBuffer } from "file-type";
import { useReactMediaRecorder } from "react-media-recorder";

const audioEncoder = require("audio-encoder");
const Flac = require("libflacjs/dist/libflac.js");

const getLength = (recBuffers) => {
  let recLength = 0;
  for (let i = recBuffers.length - 1; i >= 0; --i) {
    recLength += recBuffers[i].byteLength;
  }
  return recLength;
};

const mergeBuffers = (channelBuffer, recordingLength) => {
  let result = new Uint8Array(recordingLength);
  let offset = 0;
  let lng = channelBuffer.length;
  for (let i = 0; i < lng; i++) {
    let buffer = channelBuffer[i];
    result.set(buffer, offset);
    offset += buffer.length;
  }
  return result;
};

const writeMd5 = (view, offset, str) => {
  let index;
  for (let i = 0; i < str.length / 2; ++i) {
    index = i * 2;
    view.setUint8(i + offset, parseInt(str.substring(index, index + 2), 16));
  }
};

const addFLACMetaData = (chunks, metadata) => {
  let offset = 4;
  let dataIndex = 0;
  let data = chunks[0]; // 1st data chunk should contain FLAC identifier "fLaC" or OGG identifier "OggS"

  data = chunks[dataIndex]; // data chunk should contain FLAC identifier "fLaC"
  if (
    data.length < 4 ||
    String.fromCharCode.apply(null, data.subarray(offset - 4, offset)) !==
      "fLaC"
  ) {
    console.error(
      "Unknown data format: cannot add additional FLAC meta data to header"
    );
    return;
  }

  // first chunk only contains the flac identifier string?
  if (data.length === 4) {
    data = chunks[dataIndex + 1]; // get 2nd data chunk which should contain STREAMINFO meta-data block (and probably more)
    offset = 0;
  }
  let view = new DataView(data.buffer);
  // console.log('addFLACMetaData: '+(isOgg? 'OGG' : 'FLAC')+' (offset: '+offset+') -> ', metadata, view)
  // NOTE by default, the encoder writes a 2nd meta-data block (type VORBIS_COMMENT) with encoder/version info -> do not set "is last" to TRUE for first one
  //	// write "is last meta data block" & type STREAMINFO type (0) as little endian combined uint1 & uint7 -> uint8:
  //	var isLast = 1;//1 bit
  //	var streamInfoType = 0;//7 bit
  //	view.setUint8(0 + offset, isLast << 7 | streamInfoType, true);//8 bit
  // block-header: STREAMINFO type, block length -> already set
  // block-content: min_blocksize, max_blocksize -> already set
  // write min_framesize as little endian uint24:
  view.setUint8(8 + offset, metadata.min_framesize >> 16); // 24 bit
  view.setUint8(9 + offset, metadata.min_framesize >> 8); // 24 bit
  view.setUint8(10 + offset, metadata.min_framesize); // 24 bit
  // write max_framesize as little endian uint24:
  view.setUint8(11 + offset, metadata.max_framesize >> 16); // 24 bit
  view.setUint8(12 + offset, metadata.max_framesize >> 8); // 24 bit
  view.setUint8(13 + offset, metadata.max_framesize); // 24 bit
  // block-content: sampleRate, channels, bitsPerSample -> already set
  // write total_samples as little endian uint36:
  // TODO set last 4 bits to half of the value in index 17
  view.setUint8(18 + offset, metadata.total_samples >> 24); // 36 bit
  view.setUint8(19 + offset, metadata.total_samples >> 16); // 36 bit
  view.setUint8(20 + offset, metadata.total_samples >> 8); // 36 bit
  view.setUint8(21 + offset, metadata.total_samples); // 36 bit
  writeMd5(view, 22 + offset, metadata.md5sum); // 16 * 8 bit
};

const exportFlacFile = (recBuffers, metaData) => {
  let recLength = getLength(recBuffers);
  //   if (metaData) {
  //     addFLACMetaData(recBuffers, metaData);
  //   }
  // convert buffers into one single buffer
  return mergeBuffers(recBuffers, recLength);
};

function Recorder() {
  const handleOnStop = async (mediaBlobUrl, blob) => {
    console.log(blob);
    const buffer = await blob.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(buffer);
    console.log(audioBuffer);
    console.log(audioBuffer.getChannelData(0));
    // console.log(await blob.text());

    let saveBlob = (() => {
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      return (blobParam, fileName) => {
        let url = window.URL.createObjectURL(blobParam);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      };
    })();

    let newBlobArray;
    audioEncoder(audioBuffer, "WAV", null, async (blobParam) => {
      //   saveBlob(blobParam, "test.wav");
      console.log(blobParam);
      newBlobArray = await blobParam.arrayBuffer();
      console.log(newBlobArray);
    });

    // saveBlob(blob, "test.wav");

    // const arrayBuffer = await blob.arrayBuffer();
    // const uint8Array = new Uint8Array(arrayBuffer);

    // const encoder = Flac.create_libflac_encoder(
    //   44100, // sampleRate, number, e.g. 44100
    //   1, // channels, number, e.g. 1 (mono), 2 (stereo), ...
    //   16, // bitspersample, number, e.g. 8 or 16 or 24
    //   5, // compression level, number, value between [0, 8] from low to high compression,
    //   0, // total samples
    //   false, // verify, boolean (OPTIONAL)
    //   0
    // );

    // for storing the encoded FLAC data
    // let encBuffer = [];
    // for storing the encoding FLAC metadata summary
    // let metaData;

    // [2] (a) setup writing (encoded) output data

    // const writeCallback = (
    //   encodedData /* Uint8Array */,
    //   bytes,
    //   samples,
    //   currentFrame
    // ) => {
    //   // store all encoded data "pieces" into a buffer
    //   encBuffer.push(encodedData);
    // };

    // [2] (b) optional callback for receiving metadata

    // const metadataCallback = (data) => {
    //   console.info("meta data: ", data);
    //   metaData = data;
    // };

    // [2] (c) initialize to either write to native-FALC or to OGG container

    // encode to native FLAC container
    // const statusEncoder = Flac.init_encoder_stream(
    //   encoder,
    //   writeCallback, // required callback(s)
    //   metadataCallback // optional callback(s)
    // );

    // let flacOk = 1;

    // flacOk &= statusEncoder === 0;

    /// /////
    // [3] ENCODE -> IN: for this example, a PCM Float32 audio, single channel (mono) stream
    //                   buffer (Float32Array)
    // ... repeat encoding step [3] as often as necessary

    // convert input data to signed int data, in correspondence to the bps setting (i.e. in this case int32)
    // see API docs on FLAC__stream_encoder_process_interleaved() for more details
    // const bufLength = arrayBuffer.byteLength;

    // let bufferI32 = new Int32Array(bufLength);

    // let view = new DataView(bufferI32.buffer);
    // let volume = 1;
    // let index = 0;
    // for (let i = 0; i < bufLength; i++) {
    //   view.setInt32(index, uint8Array[i] * (0x7fff * volume), true);
    //   index += 4;
    // }

    // const flacReturn = Flac.FLAC__stream_encoder_process_interleaved(
    //   encoder,
    //   bufferI32,
    //   bufLength
    // );

    // flacOk &= Flac.FLAC__stream_encoder_finish(encoder);

    // console.log(
    //   "🚀 ~ file: index.jsx ~ line 87 ~ handleOnStop ~ encBuffer",
    //   encBuffer
    // );

    // const flacUint8 = exportFlacFile(encBuffer, metaData);

    // const flacBlob = new Blob([flacUint8], {
    //   type: "audio/flac"
    // });

    // console.log(fileTypeFromBuffer(flacUint8));

    // console.log(
    //   "🚀 ~ file: index.jsx ~ line 202 ~ handleOnStop ~ metaData",
    //   metaData
    // );
    // console.log(
    //   "🚀 ~ file: index.jsx ~ line 145 ~ handleOnStop ~ flacBlob",
    //   flacBlob
    // );
    // saveBlob(flacBlob, "test.flac");
  };

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ askPermissionOnMount: true, onStop: handleOnStop });

  //   useEffect(() => {
  //     console.log(mediaBlobUrl);
  //   }, [mediaBlobUrl]);

  return (
    <Box>
      <p>{status}</p>
      <Button onClick={startRecording}>Start Recording</Button>
      <Button onClick={stopRecording}>Stop Recording</Button>
      {/* <video src={mediaBlobUrl} controls autoPlay loop /> */}
    </Box>
  );
}

export default Recorder;
