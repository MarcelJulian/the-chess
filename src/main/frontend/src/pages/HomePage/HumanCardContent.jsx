import React, { useState } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { findMatchHandler } from "services/gameStreamService";
import { showRequestErrorToast } from "store/reducers/uiSlice";

function TimeControlButton({
  label,
  accessToken,
  bodyParams,
  isButtonClicked,
  isButtonClickedHandler
}) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickHandler = async (token, params) => {
    setIsLoading(true);
    isButtonClickedHandler(true);

    const response = await findMatchHandler(token, params);

    setIsLoading(false);
    isButtonClickedHandler(false);

    if (response.status !== 200) dispatch(showRequestErrorToast(response));
    else navigate(`/${response.data}`);
  };

  return (
    <LoadingButton
      variant="contained"
      size="large"
      fullWidth
      sx={{ minHeight: "8rem" }}
      onClick={() => onClickHandler(accessToken, bodyParams)}
      disabled={isButtonClicked}
      loading={isLoading}
    >
      <Typography variant="h4">{label}</Typography>
    </LoadingButton>
  );
}

function HumanCardContent() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const isButtonClickedHandler = (v) => setIsButtonClicked(v);

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
      isButtonClicked={isButtonClicked}
      isButtonClickedHandler={isButtonClickedHandler}
    />,
    <TimeControlButton
      label="10+5"
      accessToken={accessToken}
      bodyParams={{ time: 10, increment: 5 }}
      isButtonClicked={isButtonClicked}
      isButtonClickedHandler={isButtonClickedHandler}
    />,
    <TimeControlButton
      label="15+10"
      accessToken={accessToken}
      bodyParams={{ time: 15, increment: 10 }}
      isButtonClicked={isButtonClicked}
      isButtonClickedHandler={isButtonClickedHandler}
    />,
    <TimeControlButton
      label="30+0"
      accessToken={accessToken}
      bodyParams={{ time: 30, increment: 0 }}
      isButtonClicked={isButtonClicked}
      isButtonClickedHandler={isButtonClickedHandler}
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
