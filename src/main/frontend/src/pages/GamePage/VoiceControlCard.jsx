import React from "react";

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";

function VoiceControlCard() {
  const theme = useTheme();
  const backgroundColor = theme.palette.neutral.main;

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
    </Card>
  );
}

export default VoiceControlCard;
