import React, { useState, useEffect } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import useTheme from "@mui/material/styles/useTheme";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

import signInToLichess from "services/authService";
import { getOnGoingGames, matchWithBot } from "services/gameService";
import { signIn } from "store/reducers/sessionSlice";
import {
  showRequestErrorToast,
  showSuccessToast
} from "store/reducers/uiSlice";

import BotCardContent from "./BotCardContent";
import CardTitle from "./CardTitle";
import HumanCardContent from "./HumanCardContent";

function HomePage() {
  const { isSignedIn, accessToken } = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    if (!isSignedIn) {
      const tempAccessToken = searchParams.get("access-token");
      const tempUsername = searchParams.get("username");

      if (tempAccessToken !== null && tempUsername !== null) {
        dispatch(
          signIn({ accessToken: tempAccessToken, username: tempUsername })
        );
        dispatch(showSuccessToast("Sign in success!"));
        // remove search param
        navigate("/");
      }
    }
  }, [searchParams, isSignedIn]);

  useEffect(() => {
    const apiHandler = async () => {
      if (isSignedIn) {
        const response = await getOnGoingGames(accessToken);
        if (response.status === 200) {
          const gameId = response.data.game_id;
          if (gameId) {
            dispatch(
              showSuccessToast("You are currently in a game. Redirecting...")
            );
            setTimeout(() => navigate(`/${gameId}`), 3000);
          }
        }
      }
    };

    apiHandler();
  }, [isSignedIn]);

  return (
    <Container
      sx={{
        height: "calc(100vh - 64px)"
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "space-around"
      }}
    >
      <Box
        paddingTop="4rem"
        // paddingBottom="auto"
        display="flex"
        justifyContent={isSignedIn ? "space-between" : "center"}
      >
        {isSignedIn === false ? (
          <DefaultCard />
        ) : (
          <>
            <BotCard />
            <HumanCard />
          </>
        )}
      </Box>
    </Container>
  );
}

export default HomePage;

function BotCard() {
  // will be used for login service
  const {
    strength,
    color,
    timeControlMode,
    timeControlMinute,
    timeControlIncrement
  } = useSelector((state) => state.botForm);
  const accessToken = useSelector((state) => state.session.accessToken);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  // Warna box play with human & bot
  const backgroundColor = theme.palette.neutral.main;

  const isBotButtonDisabled =
    timeControlMinute === 0 && timeControlIncrement === 0;

  const isUnlimited = timeControlMode === "unlimited";

  const matchWithBotHandler = async () => {
    setIsLoading(true);

    let bodyParams = {
      level: strength,
      color
    };
    if (!isUnlimited)
      bodyParams = {
        ...bodyParams,
        clock_limit: isUnlimited ? 0 : timeControlMinute * 60,
        clock_increment: isUnlimited ? 0 : timeControlIncrement
      };

    const response = await matchWithBot(accessToken, bodyParams);
    if (response.status !== 200) dispatch(showRequestErrorToast(response));
    else {
      const gameId = response.data.game_id;
      navigate(`/${gameId}`);
    }
  };

  return (
    <Card
      sx={{
        // marginBottom: "1rem",
        borderRadius: "16px",
        width: "48%",
        paddingTop: "1rem",
        backgroundColor
      }}
    >
      <CardTitle label="Play with Bot" />
      <BotCardContent />
      <Box display="flex">
        <LoadingButton
          variant="contained"
          fullWidth
          disabled={isBotButtonDisabled}
          loading={isLoading}
          onClick={() => matchWithBotHandler()}
        >
          Start
        </LoadingButton>
      </Box>
    </Card>
  );
}

function HumanCard() {
  const theme = useTheme();
  // Warna box play with human & bot
  const backgroundColor = theme.palette.neutral.main;
  return (
    <Card
      sx={{
        // marginBottom: "1rem",
        borderRadius: "16px",
        width: "48%",
        paddingTop: "1rem",
        backgroundColor
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <CardTitle label="Play with Human" />
        <Box display="flex" alignItems="center" sx={{ height: "100%" }}>
          <HumanCardContent />
        </Box>
      </Box>
    </Card>
  );
}

function DefaultCard() {
  const theme = useTheme();
  const backgroundColor = theme.palette.neutral.main;

  const dispatch = useDispatch();

  const signInHandler = async () => {
    const response = await signInToLichess();
    if (response.status !== 200) dispatch(showRequestErrorToast(response));
  };

  return (
    <Card
      sx={{
        marginBottom: "1rem",
        paddingX: "1rem",
        borderRadius: "16px",
        width: "50%",
        backgroundColor
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ height: "100%", paddingY: "1rem" }}
      >
        Please sign in with your lichess account to continue.
        <Button
          variant="contained"
          onClick={signInHandler}
          sx={{ display: "block", color: "white", marginTop: "1rem" }}
        >
          Sign In
        </Button>
        <Alert severity="info" sx={{ marginTop: "1rem", width: "100%" }}>
          As a third party application, a slight lag is to be tolerated
        </Alert>
      </Box>
    </Card>
  );
}
