import React from "react";

import Box from "@mui/material/Box";

// TODO: refactor styling
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        fontSize: "1rem",
        fontWeight: "700",
        ...sx
      }}
      {...other}
    />
  );
}

export default Item;
