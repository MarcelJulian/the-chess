import React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

function CenteredGridItemContainer({ component, label }) {
  return <Box sx={{ textAlign: "center" }}>{component ?? label}</Box>;
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
