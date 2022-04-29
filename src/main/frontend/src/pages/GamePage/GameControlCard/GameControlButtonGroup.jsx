import React from "react";

import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewind from "@mui/icons-material/FastRewind";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

function IconButtonGridItemContainer({ icon }) {
  const iconButton = (
    <IconButton
      sx={{
        h: "100%",
        w: "100%"
      }}
    >
      {icon}
    </IconButton>
  );
  return <CenteredGridItemContainer component={iconButton} />;
}

function CenteredGridItemContainer({ component, label }) {
  return <Box sx={{ textAlign: "center" }}>{component ?? label}</Box>;
}

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
