import React from "react";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function TimeControlButton({ label }) {
  return (
    <Button
      variant="contained"
      size="large"
      fullWidth
      sx={{
        minHeight: "8rem"
      }}
    >
      <Typography variant="h4">{label}</Typography>
    </Button>
  );
}

function HumanCardContent() {
  const timeControlButtons = [
    <TimeControlButton label="5+3" />,
    <TimeControlButton label="10+0" />,
    <TimeControlButton label="10+5" />,
    <TimeControlButton label="15+10" />,
    <TimeControlButton label="30+0" />,
    <TimeControlButton label="30+20" />
  ];

  const wrapWithGridItem = (components) =>
    components.map((component, index) => (
      <Grid key={component.props.label} item xs={4}>
        {component}
      </Grid>
    ));

  return (
    <Container>
      <Grid container spacing={2}>
        {wrapWithGridItem(timeControlButtons)}
      </Grid>
    </Container>
  );
}

export default HumanCardContent;