import React, { useState, useEffect } from "react";

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

function VoiceControlCard() {
  const theme = useTheme();
  // Warna box voice
  const backgroundColor = theme.palette.neutral.main;

  const [isRequestSuccess, setIsRequestSuccess] = useState(true);
  const isSendingMove = useSelector((state) => state.ui.isSendingMove);

  useEffect(() => {
    if (isSendingMove === false && isRequestSuccess === false) {
      setIsRequestSuccess(true);
      setTimeout(() => setIsRequestSuccess(false), 5000);
      // setting initial state
    } else if (isRequestSuccess) setIsRequestSuccess(false);
  }, [isSendingMove]);

  const progressUiHandler = () => {
    if (isSendingMove)
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginLeft="0.5rem"
        >
          Sending move
          <CircularProgress
            color="secondary"
            size="1rem"
            sx={{ marginLeft: "1rem" }}
          />
        </Box>
      );
    if (isRequestSuccess)
      return (
        <Box display="flex" marginLeft="0.5rem">
          Move sent! ✅
        </Box>
      );
    return (
      <Box display="flex" marginLeft="0.5rem">
        Idle ➖
      </Box>
    );
  };

  return (
    <Card
      sx={{
        justifyContent: "center",
        padding: "1rem",
        width: "100%",
        backgroundColor
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginTop: "2rem",
          marginBottom: "2rem",
          fontSize: "14",
          textAlign: "center"
        }}
      >
        Movement :
      </Typography>
      <Typography
        variant="h6"
        sx={{
          marginTop: "0.5rem",
          textAlign: "center"
        }}
      >
        Your Input :
      </Typography>
      <Box marginTop="15%">
        <IconButton>
          <MicIcon />
        </IconButton>
        <IconButton>
          <MicOffIcon />
        </IconButton>
      </Box>
      <Box display="flex">
        Status:
        {progressUiHandler()}
      </Box>
    </Card>
  );
}

export default VoiceControlCard;
