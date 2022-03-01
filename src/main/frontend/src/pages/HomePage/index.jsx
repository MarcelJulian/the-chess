import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { signIn } from "store/reducers/sessionSlice";

import BotCardContent from "./BotCardContent";
import CardTitle from "./CardTitle";
import HumanCardContent from "./HumanCardContent";

function HomePage() {
  const { isSignedIn } = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    if (!isSignedIn) {
      const accessToken = searchParams.get("access-token");
      const username = searchParams.get("username");

      if (accessToken !== null && username !== null) {
        dispatch(signIn({ accessToken, username }));
      }
    }
  }, [searchParams]);

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Container>
        <Box display="flex" justifyContent="space-between">
          <BotCard />
          <HumanCard />
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;

function BotCard() {
  // will be used for login service
  const botForm = useSelector((state) => state.botForm);
  const { timeControlMinute, timeControlIncrement } = botForm;
  const isBotButtonDisabled =
    timeControlMinute === 0 && timeControlIncrement === 0;

  return (
    <Card
      sx={{
        marginBottom: "1rem",
        borderRadius: "16px",
        width: "48%",
        paddingTop: "1rem",
        backgroundColor: "secondary"
      }}
    >
      <CardTitle label="Play with Bot" />
      <BotCardContent />
      <Box display="flex">
        <Button variant="contained" fullWidth disabled={isBotButtonDisabled}>
          Start
        </Button>
      </Box>
    </Card>
  );
}

function HumanCard() {
  return (
    <Card
      sx={{
        marginBottom: "1rem",
        borderRadius: "16px",
        width: "48%",
        backgroundColor: "secondary"
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ height: "100%", paddingTop: "1rem" }}
      >
        <CardTitle label="Play with Human" />
        <Box display="flex" alignItems="center" sx={{ height: "100%" }}>
          <HumanCardContent />
        </Box>
      </Box>
    </Card>
  );
}
