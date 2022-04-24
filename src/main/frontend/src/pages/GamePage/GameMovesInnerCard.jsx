import React, { useState, useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

function ChessMoveBox({
  v,
  isNumber,
  isCurrent = false
  //   hoverValue,
  //   onHoverHandler = () => null
}) {
  const theme = useTheme();
  //   const hoverColor = theme.palette.primary.main;
  // Warna table current
  const currentColor = theme.palette.primary.light;
  // Warna table nomor movement
  const numberColor = theme.palette.neutral.darker;

  const getColor = () => {
    if (isNumber) return numberColor;
    // if (hoverValue === v) return hoverColor;
    if (isCurrent) return currentColor;
    return "unset";
  };

  return (
    <Box
      key={v}
      sx={{
        maxHeight: "1.5rem",
        width: isNumber ? "16%" : "42%",
        textAlign: "center",
        fontWeight: isCurrent ? 700 : 500,
        backgroundColor: getColor()
        // cursor: isNumber ? "default" : "pointer"
      }}
      //   onMouseEnter={() => onHoverHandler(v)}
      //   onMouseLeave={() => onHoverHandler(null)}
    >
      {v}
    </Box>
  );
}

function GameMovesInnerCard({ pgn }) {
  // Game control is complicated. Will develop if needed
  //   const [hoverValue, setHoverValue] = useState();
  //   const onHoverHandler = (v) => setHoverValue(v);

  const gridEndRef = useRef(null);

  const scrollToBottom = () =>
    gridEndRef.current.scrollIntoView({ behavior: "smooth" });

  // sets auto scroll when there's a new move
  useEffect(() => scrollToBottom(), [pgn]);

  const cleanGamePgn = (gamePgn) => {
    const moveStartIndex = gamePgn.indexOf("1.");
    // discard the head values (player names and such), take the moves only
    let tempPgn = gamePgn.slice(moveStartIndex);
    // replaces all dot to empty string
    tempPgn = tempPgn.replace(/\./g, "");
    // split the string by space into an array
    tempPgn = tempPgn.split(" ");
    return tempPgn;
  };

  const generateGridItems = () => {
    const cleanedPgn = cleanGamePgn(pgn);
    // if empty
    if (cleanedPgn.length === 1) return <div />;

    const gridContainers = [];
    let gridItems = [];

    const wrapWithFlex = (items) =>
      gridContainers.push(<Box sx={{ display: "flex" }}>{items}</Box>);

    const len = cleanedPgn.length;

    cleanedPgn.forEach((v, i) => {
      const chessMoveBoxProps = {
        v,
        isNumber: i % 3 === 0
        // hoverValue,
        // onHoverHandler
      };
      // wrap and reset every row
      if (i % 3 === 0 && gridItems.length !== 0) {
        wrapWithFlex(gridItems);
        gridItems = [];
        gridItems.push(<ChessMoveBox {...chessMoveBoxProps} />);
        // last move
      } else if (i === len - 1) {
        gridItems.push(<ChessMoveBox {...chessMoveBoxProps} isCurrent />);
        // if last move is white
        if (len % 3 === 2)
          gridItems.push(<ChessMoveBox v={" "} isNumber={false} />);
      } else gridItems.push(<ChessMoveBox {...chessMoveBoxProps} />);
    });

    wrapWithFlex(gridItems);

    return gridContainers;
  };

  return (
    <Box
      sx={{
        height: "calc(1.5rem * 4)",
        overflow: "auto"
      }}
    >
      {generateGridItems()}
      <div ref={gridEndRef} />
    </Box>
  );
}

export default GameMovesInnerCard;
