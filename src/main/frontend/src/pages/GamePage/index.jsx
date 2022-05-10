import React, { useState, useEffect, useMemo } from "react";

import Box from "@mui/material/Box";
import Chess from "chess.js";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import Board from "components/Board";
import { movePiece } from "services/gameService";
import { streamBoardGameState } from "services/gameStreamService";
import {
  setIsKeyPressedTrue,
  setIsKeyPressedFalse
} from "store/reducers/boardSlice";
import { initializeGame, setGameState } from "store/reducers/gameSlice";
import {
  InputStatus,
  setInputStatus,
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
  const { accessToken, username, isSignedIn } = useSelector(
    (state) => state.session
  );
  const { key, isKeyPressed } = useSelector((state) => state.board);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isGameEnd, setIsGameEnd] = useState(false);

  const [game, setGame] = useState(new Chess());
  const setGameHandler = (g) => setGame(g);

  const audio = useMemo(() => new Audio(`/sfx/move.mp3`));
  const playAudio = () => audio.play();

  const getTurnAndLastMove = (moves, isWhiteParam) => {
    if (moves === "" || moves === null || moves === undefined)
      return {
        isWhiteTurn: true,
        lastMove: null,
        hasMoved: false
      };

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
    const { black, white } = fullGameStateResponse;
    fullGameStateResponse.isWhite = black.name !== username;

    const isVsAi = black.aiLevel !== undefined || white.aiLevel !== undefined;

    const movesCopy = fullGameStateResponse?.state?.moves;

    if (movesCopy !== "" || movesCopy !== null || movesCopy !== undefined) {
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
        ...getTurnAndLastMove(movesCopy, fullGameStateResponse.isWhite),
        isVsAi
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
        return false;
    }
    return true;
  };

  const setGameStateHandler = (gameStateResponse) => {
    const { isWhiteTurn, lastMove, hasMoved } = getTurnAndLastMove(
      gameStateResponse?.moves,
      isWhite
    );
    const gameCopy = { ...game };
    const isGameEndTemp = gameEndHandler(gameStateResponse?.status);
    if (isGameEndTemp) setIsGameEnd(true);

    if (gameCopy !== null && lastMove !== null) {
      const tryMove = gameCopy.move(lastMove, { sloppy: true });

      if (tryMove !== null) {
        playAudio();
        setGameHandler(gameCopy);

        dispatch(
          setGameState({
            ...gameStateResponse,
            isWhiteTurn,
            lastMove,
            hasMoved
          })
        );
      }
    }
  };

  useEffect(() => {
    // if (!isSignedIn) {
    //   dispatch(showErrorToast("Please sign in first. Redirecting..."));
    //   setTimeout(() => navigate(`/`), 3000);
    // } else
    streamBoardGameState(
      accessToken,
      gameId,
      initializeGameHandler,
      setGameStateHandler
    );
  }, [gameId]);

  const gameTurn = game.turn();

  // Handle sending the move made by the player
  useEffect(() => {
    const sendMoveRequest = async (move) => {
      dispatch(setInputStatus(InputStatus.SEND_MOVE));
      const response = await movePiece(accessToken, gameId, move);
      if (response.status !== 200) {
        dispatch(setInputStatus(InputStatus.MOVE_REJECTED));
        dispatch(showRequestErrorToast(response));
      } else dispatch(setInputStatus(InputStatus.MOVE_SENT));
    };

    if (accessToken !== null && isWhite !== null && isGameEnd === false)
      if ((isWhite && gameTurn === "b") || (!isWhite && gameTurn === "w")) {
        // Every opponent's turn, means the last move was made by the player
        const gameCopy = { ...game };

        const playerMove = gameCopy.undo();
        if (playerMove !== null)
          sendMoveRequest(`${playerMove.from}${playerMove.to}`);
      }
  }, [gameTurn, isGameEnd]);

  const onKeyDownHandler = (e) => {
    if (!isKeyPressed && e.key === key) dispatch(setIsKeyPressedTrue());
  };

  const onKeyUpHandler = (e) => {
    if (isKeyPressed && e.key === key) dispatch(setIsKeyPressedFalse());
  };

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
      tabIndex="0"
      onKeyDown={onKeyDownHandler}
      onKeyUp={onKeyUpHandler}
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
        <GameControlCard pgn={game.pgn()} isGameEnd={isGameEnd} />
      </CenteredFlexBox>
    </CenteredFlexBox>
  );
}

export default GamePage;
