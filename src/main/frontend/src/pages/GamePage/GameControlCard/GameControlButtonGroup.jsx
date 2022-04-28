import React from "react";

import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewind from "@mui/icons-material/FastRewind";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import Grid from "@mui/material/Grid";

import { IconButtonGridItemContainer } from "../ItemContainers";

// currently unused. Optional feature
function GameControlButtonGroup(backgroundColor) {
  return (
    <Grid container sx={{ backgroundColor }}>
      <Grid item xs={3}>
        <IconButtonGridItemContainer icon={<FastRewind />} />
      </Grid>
      <Grid item xs={3}>
        <IconButtonGridItemContainer icon={<FirstPageIcon />} />
      </Grid>
      <Grid item xs={3}>
        <IconButtonGridItemContainer icon={<LastPageIcon />} />
      </Grid>
      <Grid item xs={3}>
        <IconButtonGridItemContainer icon={<FastForwardIcon />} />
      </Grid>
    </Grid>
  );
}

export default GameControlButtonGroup;
