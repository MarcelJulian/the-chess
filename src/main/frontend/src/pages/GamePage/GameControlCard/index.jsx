import React, { useMemo } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";

import { abortGame, resignGame, handleDrawOffer } from "services/gameService";
import {
  showRequestErrorToast,
  setIsDrawOffered
} from "store/reducers/uiSlice";

import GameMovesInnerCard from "./GameMovesInnerCard";
import TimeUsernameBox from "./TimeUsernameBox";

function GameControlCard({ game, setGameHandler, isGameEnd, isTutorial }) {
  const theme = useTheme();
  // Warna box keseluruhan
  const backgroundColor = theme.palette.neutral.main;
  // Warna header table movement
  const darkerBackgroundColor = theme.palette.neutral.darker;

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
  const isDrawOffered = useSelector((state) => state.ui.isDrawOffered);

  const checkIsTurn = (isTurnParam) => hasMoved && !isGameEnd && isTurnParam;

  const blackTemp = useMemo(
    () => ({
      ...black,
      time: clock === null ? null : gameState.btime,
      isTurn: checkIsTurn(!isWhiteTurn)
    }),
    [gameState?.btime, isWhiteTurn, hasMoved, isGameEnd]
  );
  const whiteTemp = useMemo(
    () => ({
      ...white,
      time: clock === null ? null : gameState.wtime,
      isTurn: checkIsTurn(isWhiteTurn)
    }),
    [gameState?.wtime, isWhiteTurn, hasMoved, isGameEnd]
  );

  const opponent = isWhite ? blackTemp : whiteTemp;
  const player = isWhite ? whiteTemp : blackTemp;

  const abortGameHandler = async (accessTokenParam, gameIdParam) => {
    const response = await abortGame(accessTokenParam, gameIdParam);
    if (response.status !== 200) dispatch(showRequestErrorToast(response));
  };

  // TODO: test offer, accept, decline
  const offerDrawHandler = async (accessTokenParam, gameIdParam, accept) => {
    if (isDrawOffered) dispatch(setIsDrawOffered(false));
    const response = await handleDrawOffer(
      accessTokenParam,
      gameIdParam,
      accept
    );
    if (response.status !== 200) dispatch(showRequestErrorToast(response));
  };

  const resignGameHandler = async (accessTokenParam, gameIdParam) => {
    const response = await resignGame(accessTokenParam, gameIdParam);
    if (response.status !== 200) dispatch(showRequestErrorToast(response));
  };

  if ((gameState?.wdraw && !isWhite) || (gameState?.bdraw && isWhite))
    dispatch(setIsDrawOffered(true));

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

  const resetGameHandler = () => {
    const gameCopy = { ...game };
    gameCopy.reset();
    setGameHandler(gameCopy);
  };

  const undoMoveHandler = () => {
    const gameCopy = { ...game };
    gameCopy.undo();
    setGameHandler(gameCopy);
  };

  return (
    <Card
      sx={{
        padding: "1rem",
        width: "100%",
        backgroundColor
      }}
    >
      {!isTutorial && <TimeUsernameBox user={opponent} />}

      <Card sx={{ backgroundColor, marginBottom: "1rem" }}>
        {/* currently unused. Optional feature */}
        {/* <GameControlButtonGroup backgroundColor={darkerBackgroundColor} /> */}
        <Box
          sx={{ height: "1.5rem", backgroundColor: darkerBackgroundColor }}
        />
        <GameMovesInnerCard
          pgn={game.pgn()}
          status={gameState?.status}
          isWhiteTurn={isWhiteTurn}
          backgroundColor={darkerBackgroundColor}
        />
      </Card>

      {!isTutorial && <TimeUsernameBox user={player} />}

      {!isTutorial && drawOfferUiHandler()}

      {!isTutorial && !isGameEnd && (
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

      {isTutorial && (
        <Box margin="auto" display="flex" justifyContent="space-evenly">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => resetGameHandler()}
          >
            Reset
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => undoMoveHandler()}
          >
            Undo
          </Button>
        </Box>
      )}
    </Card>
  );
}

export default React.memo(GameControlCard);
