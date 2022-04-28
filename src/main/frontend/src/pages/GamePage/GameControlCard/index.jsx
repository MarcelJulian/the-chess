import React, { useState, useMemo } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";

import { abortGame, resignGame, handleDrawOffer } from "services/gameService";
import { showRequestErrorToast } from "store/reducers/uiSlice";

import GameMovesInnerCard from "./GameMovesInnerCard";
import TimeUsernameBox from "./TimeUsernameBox";

function GameControlCard({ pgn, isGameEnd }) {
  const theme = useTheme();
  // Warna box keseluruhan
  const backgroundColor = theme.palette.neutral.main;
  // Warna header table movement
  const darkerBackgroundColor = theme.palette.neutral.darker;

  const [isDrawOffered, setIsDrawOffered] = useState(false);

  const dispatch = useDispatch();
  const {
    id,
    clock,
    black,
    white,
    isWhite,
    isWhiteTurn,
    gameState,
    hasMoved,
    isVsAi
  } = useSelector((state) => state.game);

  const accessToken = useSelector((state) => state.session.accessToken);

  const checkIsTurn = (isTurnParam) => hasMoved && !isGameEnd && isTurnParam;

  const blackTemp = useMemo(
    () => ({
      ...black,
      time: clock === null ? null : gameState.btime,
      isTurn: checkIsTurn(!isWhiteTurn)
    }),
    [gameState?.btime, isWhiteTurn]
  );
  const whiteTemp = useMemo(
    () => ({
      ...white,
      time: clock === null ? null : gameState.wtime,
      isTurn: checkIsTurn(isWhiteTurn)
    }),
    [gameState?.wtime, isWhiteTurn]
  );

  const opponent = isWhite ? blackTemp : whiteTemp;
  const player = isWhite ? whiteTemp : blackTemp;

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
        <GameMovesInnerCard pgn={pgn} />
      </Card>

      <TimeUsernameBox user={player} />

      {drawOfferUiHandler()}

      {!isGameEnd && (
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
            disabled={isVsAi || isDrawOffered ? true : !hasMoved}
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
      )}
    </Card>
  );
}

export default React.memo(GameControlCard);
