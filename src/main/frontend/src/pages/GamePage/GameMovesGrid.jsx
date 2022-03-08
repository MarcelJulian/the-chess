import React from "react";

import Grid from "@mui/material/Grid";

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

  return (
    <Grid container spacing={0}>
      {generateGridItems()}
    </Grid>
  );
}

export default GameMovesGrid;
