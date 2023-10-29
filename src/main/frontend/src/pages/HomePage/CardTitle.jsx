import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function CardTitle({ label }) {
  return (
    <Box display="flex" justifyContent="center">
      <Typography variant="h4">{label}</Typography>
    </Box>
  );
}

export default CardTitle;
