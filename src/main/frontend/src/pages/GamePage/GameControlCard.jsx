import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";
import Tooltip from "@mui/material/Tooltip";

import GameMovesInnerCard from "./GameMovesInnerCard";

function TimeUsernameBox({ time, username }) {
  return (
    <Box display="flex" flexDirection="column" marginBottom="1rem">
      <Box fontSize="2rem" fontWeight="700">
        {time}
      </Box>
      <Box fontSize="1rem" fontWeight="700">
        {username}
      </Box>
    </Box>
  );
}

function GameControlCard({ game }) {
  const theme = useTheme();
  const backgroundColor = theme.palette.neutral.main;
  const darkerBackgroundColor = theme.palette.neutral.darker;
  return (
    <Card
      sx={{
        padding: "1rem",
        width: "100%",
        backgroundColor
      }}
    >
      <TimeUsernameBox time="05:00" username="opponent" />

      <Card sx={{ backgroundColor, marginBottom: "1rem" }}>
        {/* currently unused. Optional feature */}
        {/* <GameControlButtonGroup backgroundColor={darkerBackgroundColor} /> */}
        <Box
          sx={{ height: "1.5rem", backgroundColor: darkerBackgroundColor }}
        />
        <GameMovesInnerCard pgn={game.pgn()} />
      </Card>

      <TimeUsernameBox time="05:00" username="player" />

      <Box
        margin="auto"
        width="50%"
        display="flex"
        justifyContent="space-between"
      >
        <Tooltip title="Abort">
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Draw">
          <IconButton>
            <StarHalfIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Resign">
          <IconButton>
            <FlagIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}

export default GameControlCard;
