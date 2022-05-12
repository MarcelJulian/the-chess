import { useRef, useState, useEffect, useMemo } from "react";

import { Chessboard } from "react-chessboard";
import { useSelector, useDispatch } from "react-redux";

import { movePiece } from "services/gameService";
import {
  InputStatus,
  setInputStatus,
  showRequestErrorToast
} from "store/reducers/uiSlice";

function Board({
  game,
  setGameHandler,
  boardOrientation = "white",
  isBlind = false,
  isSendMove = false
}) {
  const chessboardRef = useRef();
  const dispatch = useDispatch();
  const { boardSet, pieceSet } = useSelector((state) => state.settings);
  const accessToken = useSelector((state) => state.session.accessToken);
  const gameId = useSelector((state) => state.game.id);
  const [moveFrom, setMoveFrom] = useState("");

  //   const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});

  const calculateBoardWidth = () => {
    //  not * 0.4. 0.36 cos of padding
    const width = window.innerWidth * 0.36;
    // if (width < 448) width = 448;
    return width;
  };
  const [boardWidth, setBoardWidth] = useState(calculateBoardWidth());

  const sendMoveRequest = async (move) => {
    dispatch(setInputStatus(InputStatus.SEND_MOVE));
    const response = await movePiece(accessToken, gameId, move);
    if (response.status !== 200) {
      dispatch(setInputStatus(InputStatus.MOVE_REJECTED));
      dispatch(showRequestErrorToast(response));
    } else dispatch(setInputStatus(InputStatus.MOVE_SENT));
  };

  useEffect(() => {
    function handleResize() {
      setBoardWidth(calculateBoardWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const safeGameMutate = (modify) => {
    setGameHandler((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  };

  // shows possible moves from the clicked piece
  // also highlight the clicked piece
  const getMoveOptions = (square) => {
    const moves = game.moves({
      square,
      verbose: true
    });

    if (moves.length === 0) {
      return;
    }

    const newSquares = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%"
      };
      return move;
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)"
    };

    setOptionSquares(newSquares);
  };

  const audio = new Audio(
    "https://raw.githubusercontent.com/lichess-org/lila/master/public/sound/standard/Move.mp3"
  );
  const playAudio = () => audio.play();

  // allows click to move
  async function onSquareClick(square) {
    function resetFirstMove(tempSquare) {
      setMoveFrom(tempSquare);
      getMoveOptions(tempSquare);
    }

    // from square
    if (!moveFrom) {
      resetFirstMove(square);
      return;
    }

    // attempt to make move
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: moveFrom,
      to: square,
      promotion: "q" // always promote to a queen for example simplicity
    });
    setGameHandler(gameCopy);

    // if invalid, setMoveFrom and getMoveOptions
    if (move === null) {
      resetFirstMove(square);
      return;
    }

    audio.play();
    if (isSendMove) await sendMoveRequest(`${moveFrom}${square}`);

    setMoveFrom("");
    setOptionSquares({});
  }

  const getCustomPieces = () => {
    const returnPieces = {};
    const pieces = [
      "wP",
      "wN",
      "wB",
      "wR",
      "wQ",
      "wK",
      "bP",
      "bN",
      "bB",
      "bR",
      "bQ",
      "bK"
    ];

    pieces.map((p) => {
      returnPieces[p] = ({ squareWidth }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: isBlind
              ? "none"
              : `url(${process.env.PUBLIC_URL}/piece_set/${pieceSet}/${p}.png)`,
            backgroundSize: "100%"
          }}
        />
      );
      return null;
    });
    return returnPieces;
  };
  return (
    <Chessboard
      id="StyledBoard"
      animationDuration={200}
      boardOrientation={boardOrientation}
      boardWidth={boardWidth}
      position={game.fen()}
      onPieceDrop={(_, square) => onSquareClick(square)}
      customBoardStyle={{
        borderRadius: "0.5rem",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)"
      }}
      //   arePiecesDraggable={false}
      onPieceDragBegin={(_, square) => onSquareClick(square)}
      onSquareClick={onSquareClick}
      customSquareStyles={{
        // ...moveSquares,
        ...optionSquares
      }}
      customDarkSquareStyle={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/tile_set/${boardSet}/dark.jpg)`
      }}
      customLightSquareStyle={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/tile_set/${boardSet}/light.jpg)`
      }}
      customPieces={getCustomPieces()}
      ref={chessboardRef}
    />
  );
}

export default Board;
