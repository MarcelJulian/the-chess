import React from "react";

import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { CenteredGridItemContainer } from "./ItemContainers";

function GameMovesGrid({ pgn }) {
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

    const gridItems = [];
    cleanedPgn.forEach((v, i) => {
      if (i % 3 === 0)
        gridItems.push(
          <Grid key={v} border="1px solid" item xs={2}>
            <CenteredGridItemContainer label={v} />
          </Grid>
        );
      else
        gridItems.push(
          // eslint-disable-next-line react/no-array-index-key
          <Grid key={v + i} border="1px solid" item xs={5}>
            <CenteredGridItemContainer label={v} />
          </Grid>
        );
    });
    return gridItems;
  };

  const generateTableRows = () => {
    const cleanedPgn = cleanGamePgn(pgn);

    const tempTableRows = [];
    let tempTableRow = [];

    cleanedPgn.forEach((v, i) => {
      switch (i % 3) {
        case 0:
          tempTableRows.push(<TableRow key={v}>{tempTableRow}</TableRow>);
          tempTableRow = [];
          tempTableRow.push(
            <TableCell key={v} component="th" scope="row">
              {v}
            </TableCell>
          );
          break;
        default:
          tempTableRow.push(<TableCell key={v}>{v}</TableCell>);
          break;
      }
    });
    tempTableRows.push(<TableRow key={0}>{tempTableRow}</TableRow>);
    return tempTableRows;
  };

  return (
    <Grid
      container
      spacing={0}
      sx={{
        height: "calc(1.5rem * 4 + 0.5rem)",
        overflow: "auto"
      }}
    >
      {generateGridItems()}
    </Grid>
    // <TableContainer>
    //   <Table>
    //     <TableBody>{generateTableRows()}</TableBody>
    //   </Table>
    // </TableContainer>
  );
}

export default GameMovesGrid;
