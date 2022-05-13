/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

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

const statusParser = (status, isWhiteTurn) => {
  switch (status) {
    case "noStart":
    case "aborted":
      return "Game was aborted.";
    case "mate":
      return `${isWhiteTurn ? "Black" : "White"} wins.`;
    case "resign":
      return isWhiteTurn
        ? "White resigns, Black wins."
        : "Black resigns, White wins.";
    case "draw":
    case "stalemate":
      return "draw";
    case "outoftime":
      return isWhiteTurn
        ? "White ran out of time, Black wins."
        : "Black ran out of time, White wins.";
    default:
      return "";
  }
};

function GameMovesInnerCard({ pgn, status, isWhiteTurn, backgroundColor }) {
  // Game control is complicated. Will develop if needed
  //   const [hoverValue, setHoverValue] = useState();
  //   const onHoverHandler = (v) => setHoverValue(v);

  const isBlind = useSelector((state) => state.settings.isBlind);

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

    const wrapWithFlex = (items, i) =>
      gridContainers.push(
        <Box key={i} sx={{ display: "flex" }}>
          {items}
        </Box>
      );

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
        wrapWithFlex(gridItems, i);
        gridItems = [];
        gridItems.push(<ChessMoveBox key={v + i} {...chessMoveBoxProps} />);
        // last move
      } else if (i === len - 1) {
        gridItems.push(
          <ChessMoveBox key={v + i} {...chessMoveBoxProps} isCurrent />
        );
        // if last move is white
        if (len % 3 === 2)
          gridItems.push(<ChessMoveBox key={" "} v={" "} isNumber={false} />);
      } else
        gridItems.push(<ChessMoveBox key={v + i} {...chessMoveBoxProps} />);
    });

    wrapWithFlex(gridItems, "last");

    return gridContainers;
  };

  const statusText = statusParser(status, isWhiteTurn);

  return isBlind ? (
    <Box height="calc(1.5rem * 4)" overflow="auto" />
  ) : (
    <Box height="calc(1.5rem * 4)" overflow="auto">
      {generateGridItems()}
      {statusText.length > 0 && (
        <Typography variant="body2" sx={{ backgroundColor, padding: "0.5rem" }}>
          {statusText}
        </Typography>
      )}
      <div ref={gridEndRef} />
    </Box>
  );
}

export default GameMovesInnerCard;
