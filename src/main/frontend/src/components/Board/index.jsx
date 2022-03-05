import { useRef, useState } from "react";

import Chess from "chess.js";
import { Chessboard } from "react-chessboard";

function Board() {
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());

  const [moveFrom, setMoveFrom] = useState("");

  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});

  const safeGameMutate = (modify) => {
    setGame((g) => {
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

  // allows click to move
  function onSquareClick(square) {
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
    setGame(gameCopy);

    // if invalid, setMoveFrom and getMoveOptions
    if (move === null) {
      resetFirstMove(square);
      return;
    }

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
            backgroundImage: `url(${process.env.PUBLIC_URL}/ver3/${p}.png)`,
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
      //   boardOrientation="black"
      //   boardWidth={boardWidth}
      position={game.fen()}
      onPieceDrop={(_, square) => onSquareClick(square)}
      customBoardStyle={{
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)"
      }}
      //   arePiecesDraggable={false}
      onPieceDragBegin={(_, square) => onSquareClick(square)}
      onSquareClick={onSquareClick}
      customSquareStyles={{
        ...moveSquares,
        ...optionSquares
      }}
      // customDarkSquareStyle={{ backgroundColor: "#8d6f71" }}
      customDarkSquareStyle={{ backgroundColor: "#769656" }}
      // customLightSquareStyle={{ backgroundColor: "white" }}
      customLightSquareStyle={{ backgroundColor: "#edeed1" }}
      customPieces={getCustomPieces()}
      ref={chessboardRef}
    />
    // <button
    //     className="rc-button"
    //     onClick={() => {
    //       safeGameMutate((game) => {
    //         game.reset();
    //       });
    //       chessboardRef.current.clearPremoves();
    //       setMoveSquares({});
    //       setRightClickedSquares({});
    //     }}
    //   >
    //     reset
    //   </button>
    //   <button
    //     className="rc-button"
    //     onClick={() => {
    //       safeGameMutate((game) => {
    //         game.undo();
    //       });
    //       chessboardRef.current.clearPremoves();
    //       setMoveSquares({});
    //     }}
    //   >
    //     undo
    //   </button>
  );
}

export default Board;
