import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Countdown, { zeroPad } from "react-countdown";

function TimeUsernameBox({ user }) {
  const { time, name, rating, isTurn, aiLevel } = user;

  const nameStr = aiLevel === undefined ? name : `Stockfish ${aiLevel}`;

  const timeRenderer = ({ minutes, seconds, api }) => {
    if (!isTurn) api.pause();
    else api.start();
    return (
      <Typography variant="h5">
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </Typography>
    );
  };

  const countdownRenderer = (
    <Countdown date={Date.now() + time} renderer={timeRenderer} />
  );

  return (
    <Box display="flex" flexDirection="column" marginBottom="1rem">
      {time !== null && countdownRenderer}
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1">{nameStr}</Typography>
        <Typography variant="subtitle1">{rating ?? " "}</Typography>
      </Box>
    </Box>
  );
}

export default React.memo(TimeUsernameBox);
