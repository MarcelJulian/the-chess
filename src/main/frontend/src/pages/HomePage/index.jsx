import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { grey } from "@mui/material/colors";
import Container from "@mui/material/Container";

import BotCardContent from "./BotCardContent";
import CardTitle from "./CardTitle";
import HumanCardContent from "./HumanCardContent";
import { BotColorEnum, BotTimeControlEnum } from "./LocalEnums";

function HomePage() {
  // replace with store
  const [isLogin, setIsLogin] = useState(false);
  const [botStrength, setBotStrength] = useState(1);
  const [botColor, setBotColor] = useState(BotColorEnum.Random);
  const [botTimeControlMode, setBotTimeControlMode] = useState(
    BotTimeControlEnum.Unlimited.value
  );
  const [botTimeControlMinute, setBotTimeControlMinute] = useState(10);
  const [botTimeControlIncrement, setBotTimeControlIncrement] = useState(0);

  const botStates = {
    botStrength,
    botColor,
    botTimeControlMode,
    botTimeControlMinute,
    botTimeControlIncrement
  };

  const handleBotStrengthChange = (_, strength) => setBotStrength(strength);

  const handleBotColorChange = (_, color) => setBotColor(color);

  const handleBotTimeControlModeChange = (_, mode) =>
    setBotTimeControlMode(mode);

  const handleBotTimeControlMinuteChange = (_, minute) =>
    setBotTimeControlMinute(minute);
  const handleBotTimeControlIncrementChange = (_, increment) =>
    setBotTimeControlIncrement(increment);

  const botStateHandler = {
    handleBotStrengthChange,
    handleBotColorChange,
    handleBotTimeControlModeChange,
    handleBotTimeControlMinuteChange,
    handleBotTimeControlIncrementChange
  };

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Container>
        <Box display="flex" justifyContent="space-between">
          <Card
            sx={{
              marginBottom: "1rem",
              borderRadius: "16px",
              width: "48%",
              paddingTop: "1rem",
              backgroundColor: grey[100]
            }}
          >
            <CardTitle label="Play with Bot" />
            <BotCardContent
              botStates={botStates}
              botStateHandler={botStateHandler}
            />
            <Box display="flex">
              <Button
                variant="contained"
                fullWidth
                disabled={
                  botTimeControlMinute === 0 && botTimeControlIncrement === 0
                }
              >
                Start
              </Button>
            </Box>
          </Card>
          <Card
            sx={{
              marginBottom: "1rem",
              borderRadius: "16px",
              width: "48%",
              backgroundColor: grey[100]
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
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
