/* eslint-disable import/no-unresolved */
import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";

function ColumnBox(props) {
  const { ...other } = props;
  return (
    <Box display="flex" flexDirection="column" marginBottom="1rem" {...other} />
  );
}

function HelpDialog() {
  const theme = useTheme();
  const backgroundColor = theme.palette.neutral.main;

  return (
    <Container sx={{ backgroundColor }}>
      <Box marginBottom="2rem" justifyContent="center">
        <ColumnBox>
          <Typography>Moving a pawn</Typography>
          <Typography variant="caption">
            Speak the target coordinate (column+row). Ex: <b>e4</b>
          </Typography>
        </ColumnBox>
        <ColumnBox>
          <Typography>Moving a piece</Typography>
          <Typography variant="caption">
            Speak the piece + target coordinate (column+row). Ex:{" "}
            <b>Queen c3</b>
          </Typography>
          <Typography variant="body2">
            <b>Piece list:</b>
          </Typography>
          <ul
            style={{
              columns: 2,
              listStyleType: "none",
              paddingLeft: "1rem",
              margin: 0
            }}
          >
            <Typography variant="caption">
              <li>Knight</li>
              <li>Bishop</li>
              <li>Rook</li>
              <li>Queen</li>
              <li>King</li>
            </Typography>
          </ul>
        </ColumnBox>
        <ColumnBox>
          <Typography>Castling</Typography>
          <Typography variant="caption">
            <b>Kingside castle</b> to castle kingside. <b>Queenside castle</b>{" "}
            to castle queenside.
          </Typography>
        </ColumnBox>
        <ColumnBox>
          <Typography>Other possible commands</Typography>
          <ul
            style={{
              columns: 2,
              listStyleType: "none",
              paddingLeft: "1rem",
              margin: 0
            }}
          >
            <Typography variant="caption">
              <li>
                <b>Abort</b>: abort current game
              </li>
              <li>
                <b>Resign</b>: resign current game
              </li>
              <li>
                <b>Draw</b>: offer draw
              </li>
              <li>
                <b>Accept Draw</b>: accept draw offer
              </li>
              <li>
                <b>Decline Draw</b>: decline draw offer
              </li>
              <li>
                <b>Yes</b>: confirm move
              </li>
            </Typography>
          </ul>
        </ColumnBox>
      </Box>
    </Container>
  );
}

export default HelpDialog;
