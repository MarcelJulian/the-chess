import React from "react";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

import { findMatchHandler } from "services/gameStreamService";

function TimeControlButton({ label, accessToken, bodyParams }) {
  const onClickHandler = async (token, params) => {
    // TODO: onclick show blocking dialog
    const gameId = await findMatchHandler(token, params);
    // TODO: routing gameId
  };

  return (
    <Button
      variant="contained"
      size="large"
      fullWidth
      sx={{ minHeight: "8rem" }}
      onClick={() => onClickHandler(accessToken, bodyParams)}
    >
      <Typography variant="h4">{label}</Typography>
    </Button>
  );
}

function HumanCardContent() {
  const accessToken = useSelector((state) => state.session.accessToken);
  const timeControlButtons = [
    // <TimeControlButton
    //   label="5+3"
    //   accessToken={accessToken}
    //   bodyParams={{ time: 5, increment: 3 }}
    // />,
    <TimeControlButton
      label="10+0"
      accessToken={accessToken}
      bodyParams={{ time: 10, increment: 0 }}
    />,
    <TimeControlButton
      label="10+5"
      accessToken={accessToken}
      bodyParams={{ time: 10, increment: 5 }}
    />,
    <TimeControlButton
      label="15+10"
      accessToken={accessToken}
      bodyParams={{ time: 15, increment: 10 }}
    />,
    <TimeControlButton
      label="30+0"
      accessToken={accessToken}
      bodyParams={{ time: 30, increment: 0 }}
    />
    // <TimeControlButton
    //   label="30+20"
    //   accessToken={accessToken}
    //   bodyParams={{ time: 30, increment: 20 }}
    // />
  ];

  const wrapWithGridItem = (components) =>
    components.map((component, index) => (
      <Grid key={component.props.label} item xs={6}>
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
