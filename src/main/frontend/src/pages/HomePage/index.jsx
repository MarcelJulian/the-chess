import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { grey } from "@mui/material/colors";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

import HumanPage from "../HumanPage";

function SectionBox(props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ paddingX: "1rem", paddingY: "0.5rem" }}
    >
      {props.children}
    </Box>
  );
}

function SectionBoxTitle({ label }) {
  return (
    <Typography
      variant="h5"
      sx={{ marginBottom: "0.5rem", fontFamily: "Poppins" }}
    >
      {label}
    </Typography>
  );
}

function CardTitle({ label }) {
  return (
    <Box display="flex" justifyContent="center" sx={{ fontFamily: "Poppins" }}>
      <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>
        {label}
      </Typography>
    </Box>
  );
}

function BotColorButtonGroup({ botColor, handleBotColorChange }) {
  return (
    <ToggleButtonGroup
      value={botColor}
      exclusive
      onChange={handleBotColorChange}
      size="large"
      sx={{ border: 1 }}
    >
      <ToggleButton value="white" disableFocusRipple disableRipple>
        <Typography variant="button" sx={{ paddingX: "0.5rem" }}>
          white
        </Typography>
      </ToggleButton>
      <ToggleButton value="black" disableFocusRipple disableRipple>
        <Typography variant="button" sx={{ paddingX: "0.5rem" }}>
          black
        </Typography>
      </ToggleButton>
      <ToggleButton value="random" disableFocusRipple disableRipple>
        <Typography variant="button" sx={{ paddingX: "0.5rem" }}>
          random
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

function HomePage() {
  // replace with store
  const [isLogin, setIsLogin] = useState(false);
  const [botStrength, setBotStrength] = useState(1);
  const [botColor, setBotColor] = useState("random");
  const [botTimeControlMode, setBotTimeControlMode] = useState("unlimited");
  const [botTimeControlMinute, setBotTimeControlMinute] = useState(10);
  const [botTimeControlIncrement, setBotTimeControlIncrement] = useState(0);

  const handleBotStrengthChange = (_, strength) => setBotStrength(strength);

  const handleBotColorChange = (_, color) => setBotColor(color);

  const handleBotTimeControlModeChange = (_, mode) =>
    setBotTimeControlMode(mode);

  const handleBotTimeControlMinuteChange = (_, minute) =>
    setBotTimeControlMinute(minute);
  const handleBotTimeControlIncrementChange = (_, increment) =>
    setBotTimeControlIncrement(increment);

  const generateBotStrengthGroupButton = () => {
    const buttons = [];

    for (let i = 1; i < 9; i++) {
      buttons.push(
        <ToggleButton value={i} disableFocusRipple disableRipple>
          <Typography variant="button" sx={{ paddingX: "0.5rem" }}>
            {i}
          </Typography>
        </ToggleButton>
      );
    }
    return (
      <ToggleButtonGroup
        value={botStrength}
        exclusive
        onChange={handleBotStrengthChange}
        size="large"
        sx={{ border: 1 }}
      >
        {buttons}
      </ToggleButtonGroup>
    );
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
            <Box
              display="flex"
              flexDirection="column"
              sx={{ paddingX: "4rem" }}
            >
              {/* Box Strength Level AI */}
              <SectionBox>
                <SectionBoxTitle label="Strength" />
                {generateBotStrengthGroupButton()}
              </SectionBox>
              {/* Box color */}
              <SectionBox>
                <SectionBoxTitle label="Color" />
                <BotColorButtonGroup
                  botColor={botColor}
                  handleBotColorChange={handleBotColorChange}
                />
              </SectionBox>
              {/* Box Time Control */}
              <SectionBox>
                <SectionBoxTitle label="Time Control" />
                <ToggleButtonGroup
                  color="primary"
                  value={botTimeControlMode}
                  exclusive
                  onChange={handleBotTimeControlModeChange}
                >
                  <ToggleButton value="unlimited">
                    <Typography variant="button" sx={{ paddingX: "0.5rem" }}>
                      Unlimited
                    </Typography>
                  </ToggleButton>
                  <ToggleButton value="realtime">
                    <Typography variant="button" sx={{ paddingX: "0.5rem" }}>
                      Real Time
                    </Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              </SectionBox>
              {/* Box Minute Per Side */}
              <SectionBox>
                <SectionBoxTitle
                  label={`Minutes Per Side: ${botTimeControlMinute}`}
                />
                <Slider
                  value={botTimeControlMinute}
                  onChange={handleBotTimeControlMinuteChange}
                  max={180}
                />
              </SectionBox>
              {/* Box Minute Per Side */}
              <SectionBox>
                <SectionBoxTitle
                  label={`Increment in Second: ${botTimeControlIncrement}`}
                />
                <Slider
                  value={botTimeControlIncrement}
                  onChange={handleBotTimeControlIncrementChange}
                  max={180}
                />
              </SectionBox>
            </Box>
            {/* Box START */}
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
                <HumanPage />
              </Box>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
