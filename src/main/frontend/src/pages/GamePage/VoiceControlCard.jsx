import React, { useEffect } from "react";

import HelpIcon from "@mui/icons-material/Help";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";

import Recorder from "components/Recorder";
import { ResponseType } from "services/transcibeService";
import {
  InputStatus,
  setInputStatus,
  setTranscribedData,
  showHelpDialog
} from "store/reducers/uiSlice";

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

function VoiceControlCard({ game }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { inputStatus, transcribedData } = useSelector((state) => state.ui);
  const isSpeech = useSelector((state) => state.settings.isSpeech);

  const { speechSynthesis } = window;
  const utterance = new window.SpeechSynthesisUtterance();

  // Warna box voice
  const backgroundColor = theme.palette.neutral.main;

  const parseMove = (move) => {
    let resultingText = "";
    if (move.includes("O-O")) return "Kingside Castle";
    if (move.includes("O-O-O")) return "Queenside Castle";
    for (let i = 0; i < move.length; i++) {
      switch (move.charAt(i)) {
        case "N":
          resultingText += "Knight ";
          break;
        case "B":
          resultingText += "Bishop ";
          break;
        case "R":
          resultingText += "Rook ";
          break;
        case "Q":
          resultingText += "Queen ";
          break;
        case "K":
          resultingText += "King ";
          break;
        case "x":
          resultingText += "takes ";
          break;
        case "+":
          resultingText += "check";
          break;
        case "#":
          resultingText += "checkmate";
          break;
        case "=":
          resultingText += "promote to ";
          break;
        default:
          resultingText += `${move.charAt(i)} `;
          break;
      }
    }
    return resultingText;
  };

  const parseTranscribedText = () => {
    switch (transcribedData?.type) {
      case ResponseType.MOVE:
        return `${parseMove(transcribedData.value)}?`;
      case ResponseType.COMMAND:
        return transcribedData.value;
      case ResponseType.ERROR:
        return "Move/Command invalid. Please try again.";
      default:
        return "";
    }
  };

  // initialize
  useEffect(() => {
    dispatch(setTranscribedData(null));
    dispatch(setInputStatus(InputStatus.IDLE));
  }, []);

  useEffect(() => {
    if (isSpeech) {
      const pgn = game.pgn();
      const lastMove = pgn.slice(pgn.lastIndexOf(" "));

      utterance.text = parseMove(lastMove);
      speechSynthesis.speak(utterance);
    }
  }, [game.pgn()]);

  useEffect(() => {
    if (isSpeech)
      switch (inputStatus) {
        case InputStatus.CONFIRM_MOVE:
        // eslint-disable-next-line no-fallthrough
        case InputStatus.CONFIRM_COMMAND:
        // eslint-disable-next-line no-fallthrough
        case InputStatus.TRANSCRIBE_ERROR:
          utterance.text = parseTranscribedText();
          speechSynthesis.speak(utterance);
          break;
        default:
          break;
      }
  }, [inputStatus]);

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
        return " Move/Command invalid. Please try again.";

      default:
        return <div />;
    }
  };

  return (
    <Card
      sx={{
        position: "relative",
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
      <Recorder game={game} />
      <Tooltip title="Help">
        <IconButton
          color="secondary"
          aria-label="help"
          onClick={() => dispatch(showHelpDialog())}
          sx={{
            position: "absolute",
            right: "0px",
            bottom: "0px"
          }}
        >
          <HelpIcon />
        </IconButton>
      </Tooltip>
    </Card>
  );
}

export default VoiceControlCard;
