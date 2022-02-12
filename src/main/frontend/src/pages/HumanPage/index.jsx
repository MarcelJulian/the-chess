import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function TimeControlButton({ timeControl }) {
  return (
    <Button
      variant="contained"
      size="large"
      sx={{
        width: "100%",
        minHeight: "8rem",
        fontSize: "2rem"
      }}
    >
      {timeControl}
    </Button>
  );
}

function HumanPage() {
  const timeControlButtons = [
    <TimeControlButton timeControl="5+3" />,
    <TimeControlButton timeControl="10+0" />,
    <TimeControlButton timeControl="10+5" />,
    <TimeControlButton timeControl="15+10" />,
    <TimeControlButton timeControl="30+0" />,
    <TimeControlButton timeControl="30+20" />
  ];

  const wrapWithGridItem = (components) =>
    components.map((component) => (
      <Grid item xs={4}>
        {component}
      </Grid>
    ));

  return (
    <Box>
      <Container>
        {/* Container Bawah */}
        <Grid container spacing={2}>
          {wrapWithGridItem(timeControlButtons)}
        </Grid>
      </Container>
    </Box>
  );
}

export default HumanPage;
