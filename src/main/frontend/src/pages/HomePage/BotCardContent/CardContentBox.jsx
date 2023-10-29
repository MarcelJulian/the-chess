import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function CardContentBoxTitle({ label }) {
  return (
    <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
      {label}
    </Typography>
  );
}

function CardContentBox({ label, children }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ paddingX: "1rem", paddingY: "0.5rem" }}
    >
      <CardContentBoxTitle label={label} />
      {children}
    </Box>
  );
}

export default CardContentBox;
