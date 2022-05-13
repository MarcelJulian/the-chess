import React, { useState } from "react";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";

function TutorialCard() {
  const theme = useTheme();

  // Warna box voice
  const backgroundColor = theme.palette.neutral.main;
  const darkestBackgroundColor = theme.palette.neutral.darkest;

  const dispatch = useDispatch();

  const { key, confirmKey } = useSelector((state) => state.settings);

  const [page, setPage] = useState(1);

  const recordingInstructions = () => (
    <>
      <Typography paragraph>
        Try it! Follow the following directions to record and send your move.
      </Typography>
      <Typography variant="caption">
        Press and hold{" "}
        <code
          style={{
            backgroundColor: darkestBackgroundColor,
            paddingLeft: "0.25rem",
            paddingRight: "0.25rem",
            borderRadius: "0.25rem"
          }}
        >{`${key}`}</code>{" "}
        to start recording.
      </Typography>
      <br />
      <Typography variant="caption">
        Release to end and send the recording.
      </Typography>
      <br />
      <Typography variant="caption">
        Press{" "}
        <code
          style={{
            backgroundColor: darkestBackgroundColor,
            paddingLeft: "0.25rem",
            paddingRight: "0.25rem",
            borderRadius: "0.25rem"
          }}
        >{`${confirmKey}`}</code>{" "}
        to confirm your move.
      </Typography>
    </>
  );

  const getPage1 = () => (
    <>
      <Typography variant="h6">Coordinates</Typography>
      <Typography paragraph>
        A chess board is divided into files (columns), labeled <b>a</b> through{" "}
        <b>h</b>, and ranks (rows), numbered <b>1</b> through <b>8</b>. To refer
        a square, you write the column label and the row number. Take a look at
        the figure below for examples.
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/11/SCD_algebraic_notation.png"
          alt="chess notation"
        />
        <Typography variant="caption" sx={{ marginTop: "0.25rem" }}>
          source: wikipedia
        </Typography>
      </Box>
    </>
  );

  const getPage2 = () => (
    <>
      <Typography variant="h6">Pawn Moves</Typography>
      <Typography paragraph>
        A pawn move can be made by writing the <u>target</u> coordinate. For
        example, to move the pawn in e2 to e4, you simply say, <b>e4</b>. To
        move the c7 pawn to c5, simply say <b>c5</b>
      </Typography>
      {recordingInstructions()}
    </>
  );

  const getPage3 = () => (
    <>
      <Typography variant="h6">Piece Moves</Typography>
      <Typography paragraph>
        Piece moves are similar to pawn moves. You just{" "}
        <u>add the piece name</u> before the target coordinate. For example, to
        move the knight in g1 to f3, you say <b>Knight f3</b>.
      </Typography>
      <p>{recordingInstructions()}</p>
      <Typography variant="body2">
        <b>Note:</b> in written notation, piece names will be abbreviated using
        the following rules:
      </Typography>
      <ul
        style={{
          columns: 2,
          listStyleType: "none",
          paddingLeft: "1rem",
          margin: 0
        }}
      >
        <li>
          <b>N</b>: Knight
        </li>
        <li>
          <b>B</b>: Bishop
        </li>
        <li>
          <b>R</b>: Rook
        </li>
        <li>
          <b>Q</b>: Queen
        </li>
        <li>
          <b>K</b>: King
        </li>
      </ul>
    </>
  );

  const getPage4 = () => (
    <>
      <Typography variant="h6">Additional Notation</Typography>
      <Typography>
        Aside from the aforementioned moves, the following optional notation is{" "}
        <b>omitted</b> from the speech notation (though not in written
        notation).
      </Typography>

      <ul
        style={{
          columns: 2,
          listStyleType: "none",
          paddingLeft: "1rem",
          margin: 0
        }}
      >
        <li>
          <b>x</b>: takes
        </li>
        <li>
          <b>+</b>: check
        </li>
        <li>
          <b>#</b>: checkmate
        </li>
        <li>
          <b>=</b>: promote to
        </li>
      </ul>
      <p />
      <Typography paragraph>
        And so, for something like, Bxf7+ (Bishop takes f7 check), you only need
        to say <b>Bishop f7</b>
      </Typography>
      <Typography variant="body2" paragraph>
        <b>Note on castling</b>: to castle, say either <b>kingside castle</b> or{" "}
        <b>queenside castle</b>, depending on which side you want to castle.
      </Typography>
    </>
  );

  const getPage = () => {
    switch (page) {
      case 1:
        return getPage1();
      case 2:
        return getPage2();
      case 3:
        return getPage3();
      case 4:
        return getPage4();
      default:
        return <div />;
    }
  };

  return (
    <Card
      sx={{
        padding: "1rem",
        width: "100%",
        backgroundColor
      }}
    >
      <Box height="60vh" overflow="auto">
        <Typography variant="h5">Chess Notation</Typography>
        {getPage()}
      </Box>
      <Box display="flex" justifyContent="space-evenly" paddingTop="1rem">
        <IconButton
          color="secondary"
          aria-label="previous page"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <ArrowCircleLeftIcon />
        </IconButton>
        <IconButton
          color="secondary"
          aria-label="next page"
          disabled={page === 4}
          onClick={() => setPage(page + 1)}
        >
          <ArrowCircleRightIcon />
        </IconButton>
      </Box>
    </Card>
  );
}

export default TutorialCard;
