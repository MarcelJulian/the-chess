import React from "react";

import IconButton from "@mui/material/IconButton";

import Item from "./Item";

function CenteredGridItemContainer({ component, label }) {
  return <Item sx={{ textAlign: "center" }}>{component ?? label}</Item>;
}

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

export { CenteredGridItemContainer, IconButtonGridItemContainer };
