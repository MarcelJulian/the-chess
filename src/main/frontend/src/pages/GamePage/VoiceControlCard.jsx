import React, { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";

import Recorder from "components/Recorder";
import { InputStatus, setInputStatus } from "store/reducers/uiSlice";

function StatusProgressBox({ text, color = "secondary" }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginLeft="0.25rem"
    >
      {text}
      <CircularProgress
        color={color}
        size="1rem"
        sx={{ marginLeft: "0.5rem" }}
      />
    </Box>
  );
}

function VoiceControlCard() {
  const theme = useTheme();
  const dispatch = useDispatch();
  // Warna box voice
  const backgroundColor = theme.palette.neutral.main;

  const inputStatus = useSelector((state) => state.ui.inputStatus);

  const [transcribedData, setTranscribedData] = useState(null);

  const setDataHandler = (input) => setTranscribedData(input);

  const statusRenderer = () => {
    switch (inputStatus) {
      case InputStatus.IDLE:
        return " Idle ➖";

      case InputStatus.SEND_MOVE:
        return <StatusProgressBox text="Sending move" />;

      case InputStatus.MOVE_SENT:
        setTimeout(() => dispatch(setInputStatus(InputStatus.IDLE), 5000));
        return " Move sent! ✅";

      case InputStatus.MOVE_REJECTED:
        setTimeout(() => dispatch(setInputStatus(InputStatus.IDLE), 5000));
        return " Move rejected! ❌";

      case InputStatus.RECORD:
        return <StatusProgressBox text="Recording" color="error" />;

      case InputStatus.TRANSCRIBE:
        return <StatusProgressBox text="Transforming into text" />;

      case InputStatus.CONFIRM_MOVE:
        return " Confirm move! [Yes/No]";

      case InputStatus.CONFIRM_COMMAND:
        return " Confirm command! [Yes/No]";

      case InputStatus.TRANSCRIBE_ERROR:
        return " Transcribe error. Please try again.";

      default:
        return <div />;
    }
  };

  return (
    <Card
      sx={{
        padding: "1rem",
        width: "100%",
        backgroundColor
      }}
    >
      <Typography variant="h6">{`Your Input: ${
        transcribedData?.value ?? " "
      }`}</Typography>
      <Box display="flex" marginTop="0.5rem">
        Status:
        {statusRenderer()}
      </Box>
      <Recorder
        setDataHandler={setDataHandler}
        transcribedData={transcribedData}
      />
    </Card>
  );
}

export default VoiceControlCard;
