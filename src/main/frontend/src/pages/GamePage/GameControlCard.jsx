import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import Countdown, { zeroPad } from "react-countdown";
import { useSelector, useDispatch } from "react-redux";

import { abortGame, resignGame, handleDrawOffer } from "services/gameService";
import { showRequestErrorToast } from "store/reducers/uiSlice";

import GameMovesInnerCard from "./GameMovesInnerCard";

function TimeUsernameBox({ user }) {
  const { time, name, rating, isTurn, aiLevel } = user;

  const nameStr = aiLevel === undefined ? name : `Stockfish ${aiLevel}`;

  const timeRenderer = ({ minutes, seconds }) => (
    <Typography variant="h5">
      {zeroPad(minutes)}:{zeroPad(seconds)}
    </Typography>
  );

  const timeHandler = () => {
    if (time !== null)
      return (
        <Countdown
          date={Date.now() + time}
          renderer={timeRenderer}
          autoStart={isTurn}
        />
      );
    return <div />;
  };

  return (
    <Box display="flex" flexDirection="column" marginBottom="1rem">
      {timeHandler()}
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1">{nameStr}</Typography>
        <Typography variant="subtitle1">{rating ?? " "}</Typography>
      </Box>
    </Box>
  );
}

function GameControlCard({ game }) {
  const theme = useTheme();
  // Warna box keseluruhan
  const backgroundColor = theme.palette.neutral.main;
  // Warna header table movement
  const darkerBackgroundColor = theme.palette.neutral.darker;

  const [isDrawOffered, setIsDrawOffered] = useState(false);

  const dispatch = useDispatch();
  const { id, clock, black, white, isWhite, isWhiteTurn, gameState, hasMoved } =
    useSelector((state) => state.game);

  const accessToken = useSelector((state) => state.session.accessToken);

  const isGameEnd =
    gameState?.status !== "created" && gameState?.status !== "started";

  const blackTemp = {
    ...black,
    time: clock === null ? null : gameState.btime,
    isTurn: isGameEnd ? false : !isWhiteTurn
  };
  const whiteTemp = {
    ...white,
    time: clock === null ? null : gameState.wtime,
    isTurn: isGameEnd ? false : isWhiteTurn
  };

  //   const blackTemp = { ...black, time: 298999, isTurn: !isWhiteTurn };
  //   const whiteTemp = { ...white, time: 60999, isTurn: isWhiteTurn };

  const opponent = isWhite ? blackTemp : whiteTemp;
  const player = isWhite ? whiteTemp : blackTemp;

  // TODO: test
  const abortGameHandler = async (accessTokenParam, gameIdParam) => {
    const response = await abortGame(accessTokenParam, gameIdParam);
    if (response.status !== 200) dispatch(showRequestErrorToast(response));
  };

  // TODO: test offer, accept, decline
  const offerDrawHandler = async (accessTokenParam, gameIdParam, accept) => {
    if (isDrawOffered) setIsDrawOffered(false);
    const response = await handleDrawOffer(
      accessTokenParam,
      gameIdParam,
      accept
    );
    if (response.status !== 200) dispatch(showRequestErrorToast(response));
  };

  // TODO: test
  const resignGameHandler = async (accessTokenParam, gameIdParam) => {
    const response = await resignGame(accessTokenParam, gameIdParam);
    if (response.status !== 200) dispatch(showRequestErrorToast(response));
  };

  if ((gameState?.wdraw && !isWhite) || (gameState?.bdraw && isWhite))
    setIsDrawOffered(true);

  const drawOfferUiHandler = () => {
    if (isDrawOffered)
      return (
        <Card
          sx={{
            padding: "0.5rem",
            marginBottom: "1rem"
          }}
        >
          <Typography variant="body2" sx={{ marginBottom: "0.5rem" }}>
            Opponent has offered you a draw.
          </Typography>
          <Box margin="auto" display="flex" justifyContent="space-evenly">
            <Button
              variant="contained"
              onClick={() => offerDrawHandler(accessToken, id, "yes")}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              onClick={() => offerDrawHandler(accessToken, id, "no")}
            >
              Decline
            </Button>
          </Box>
        </Card>
      );
    return <div />;
  };

  return (
    <Card
      sx={{
        padding: "1rem",
        width: "100%",
        backgroundColor
      }}
    >
      <TimeUsernameBox user={opponent} />

      <Card sx={{ backgroundColor, marginBottom: "1rem" }}>
        {/* currently unused. Optional feature */}
        {/* <GameControlButtonGroup backgroundColor={darkerBackgroundColor} /> */}
        <Box
          sx={{ height: "1.5rem", backgroundColor: darkerBackgroundColor }}
        />
        <GameMovesInnerCard pgn={game.pgn()} />
      </Card>

      <TimeUsernameBox user={player} />

      {drawOfferUiHandler()}

      <Box margin="auto" display="flex" justifyContent="space-evenly">
        <Button
          variant="outlined"
          color="secondary"
          disabled={isDrawOffered ? true : hasMoved}
          onClick={() => abortGameHandler(accessToken, id)}
        >
          Abort
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          disabled={isDrawOffered ? true : !hasMoved}
          onClick={() => offerDrawHandler(accessToken, id, "yes")}
        >
          Draw
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          disabled={isDrawOffered ? true : !hasMoved}
          onClick={() => resignGameHandler(accessToken, id)}
        >
          Resign
        </Button>
      </Box>
    </Card>
  );
}

export default GameControlCard;
