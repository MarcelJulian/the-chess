import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Chess from "chess.js";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Board from "components/Board";
import { movePiece } from "services/gameService";
import { streamBoardGameState } from "services/gameStreamService";
import { initializeGame, setGameState } from "store/reducers/gameSlice";
import {
  showErrorToast,
  showSuccessToast,
  showRequestErrorToast
} from "store/reducers/uiSlice";

import GameControlCard from "./GameControlCard";
import VoiceControlCard from "./VoiceControlCard";

function CenteredFlexBox(props) {
  const { ...other } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...other}
    />
  );
}

function GamePage() {
  const { gameId } = useParams();

  const { isWhite } = useSelector((state) => state.game);
  const { accessToken, username } = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const [game, setGame] = useState(new Chess());
  const setGameHandler = (g) => setGame(g);

  const getTurnAndLastMove = (moves, isWhiteParam) => {
    if (moves === null || moves === undefined) return {};

    const splitMoves = moves.split(" ");
    const isWhiteTurn = splitMoves.length % 2 === 0;

    let hasMoved = true;
    if (splitMoves.length < 2)
      if (splitMoves.length === 1 && isWhiteParam) hasMoved = true;
      else hasMoved = false;

    const lastMove = splitMoves.pop();
    return { isWhiteTurn, lastMove, hasMoved };
  };

  const initializeGameHandler = (fullGameStateResponse) => {
    const { black } = fullGameStateResponse;
    fullGameStateResponse.isWhite = black.name !== username;

    const movesCopy = fullGameStateResponse?.state?.moves;
    if (movesCopy !== null || movesCopy !== undefined) {
      const splitMoves = movesCopy.split(" ");
      const gameCopy = { ...game };

      splitMoves.forEach((move) => {
        gameCopy.move(move, { sloppy: true });
      });
      setGameHandler(gameCopy);
    }

    dispatch(
      initializeGame({
        ...fullGameStateResponse,
        ...getTurnAndLastMove(movesCopy, fullGameStateResponse.isWhite)
      })
    );
  };

  const gameEndHandler = (status) => {
    switch (status) {
      case "aborted":
        dispatch(showSuccessToast("Game was aborted."));
        break;
      case "mate":
        dispatch(showSuccessToast("Game ended with a checkmate."));
        break;
      case "resign":
        dispatch(showSuccessToast("Game was resigned."));
        break;
      case "stalemate":
        dispatch(showSuccessToast("Game ended with a stalemate."));
        break;
      case "draw":
        dispatch(showSuccessToast("Game ended with a draw."));
        break;
      case "outoftime":
        dispatch(showSuccessToast("The time has ran out."));
        break;
      case "noStart":
        dispatch(
          showErrorToast(
            "Game was aborted. No move was made withing 30 seconds."
          )
        );
        break;
      default:
        break;
    }
  };

  const setGameStateHandler = (gameStateResponse) => {
    const { isWhiteTurn, lastMove, hasMoved } = getTurnAndLastMove(
      gameStateResponse?.moves,
      isWhite
    );
    const gameCopy = { ...game };

    const tryMove = gameCopy.move(lastMove, { sloppy: true });
    if (tryMove !== null) setGameHandler(gameCopy);

    gameEndHandler(gameStateResponse?.status);

    dispatch(
      setGameState({
        ...gameStateResponse,
        isWhiteTurn,
        lastMove,
        hasMoved
      })
    );
  };

  useEffect(() => {
    streamBoardGameState(
      null,
      gameId,
      initializeGameHandler,
      setGameStateHandler
    );
  }, [gameId]);

  // Handle sending the move made by the player
  useEffect(() => {
    const sendMoveRequest = async (move) => {
      const response = await movePiece(accessToken, gameId, move);
      if (response.status !== 200) dispatch(showRequestErrorToast(response));
    };

    // Every opponent's turn, means the last move was made by the player
    if ((isWhite && game.turn() === "b") || (!isWhite && game.turn() === "w")) {
      const gameCopy = { ...game };

      const playerMove = gameCopy.undo();
      if (playerMove !== null)
        sendMoveRequest(`${playerMove.from}${playerMove.to}`);
    }
  }, [game]);

  const GAME_ID = "9G8PLB4A";

  /** 
   Outer box (1 rem)
    
   Voice Control Card - Board - Game Control Card
   (3 rem) - (1 rem) - (3 rem)

   |                                           |
   |  1 (3)  c  (3) (1)  c  (1) (3)  c  (3) 1  |
   |                                           |

   These makes evenly spaced components (4 rem)
   * */

  return (
    <CenteredFlexBox
      justifyContent="center"
      // 64px is the navbar height
      height="calc(100vh - 64px)"
      paddingX="1rem"
    >
      <CenteredFlexBox width="30%" padding="3rem">
        <VoiceControlCard />
      </CenteredFlexBox>
      <CenteredFlexBox width="40%" padding="1rem">
        <Board
          game={game}
          setGameHandler={setGameHandler}
          boardOrientation={isWhite ? "white" : "black"}
        />
      </CenteredFlexBox>
      <CenteredFlexBox width="30%" padding="3rem">
        <GameControlCard game={game} />
      </CenteredFlexBox>
    </CenteredFlexBox>
  );
}

export default GamePage;
