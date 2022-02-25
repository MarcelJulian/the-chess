import { useRef, useState } from "react";

import Chess from "chess.js";
import { Chessboard } from "react-chessboard";

function Board() {
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for example simplicity
    });
    setGame(gameCopy);
    return move;
  }

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
  const customPieces = () => {
    const returnPieces = {};
    pieces.map((p) => {
      returnPieces[p] = ({ squareWidth }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(/ver3/${p}.png)`,
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
      onPieceDrop={onDrop}
      customBoardStyle={{
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)"
      }}
      // customDarkSquareStyle={{ backgroundColor: "#8d6f71" }}
      customDarkSquareStyle={{ backgroundColor: "#769656" }}
      // customLightSquareStyle={{ backgroundColor: "white" }}
      customLightSquareStyle={{ backgroundColor: "#edeed1" }}
      customPieces={customPieces()}
      ref={chessboardRef}
    />
  );
}

export default Board;
