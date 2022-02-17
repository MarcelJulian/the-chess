import React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

import BotColorButtonGroup from "./BotColorButtonGroup";
import BotStrengthButtonGroup from "./BotStrengthButtonGroup";
import BotTimeControlButtonGroup from "./BotTimeControlButtonGroup";
import CardContentBox from "./CardContentBox";

// import CustomToggleButton from "../../components/CustomToggleButton";

function BotCardContent({ botStates, botStateHandler }) {
  const {
    botStrength,
    botColor,
    botTimeControlMode,
    botTimeControlMinute,
    botTimeControlIncrement
  } = botStates;
  const {
    handleBotStrengthChange,
    handleBotColorChange,
    handleBotTimeControlModeChange,
    handleBotTimeControlMinuteChange,
    handleBotTimeControlIncrementChange
  } = botStateHandler;

  return (
    <Box display="flex" flexDirection="column" sx={{ paddingX: "4rem" }}>
      {/* Box Strength Level AI */}
      <CardContentBox label="Strength">
        <BotStrengthButtonGroup
          botStrength={botStrength}
          handleBotStrengthChange={handleBotStrengthChange}
        />
      </CardContentBox>
      {/* Box color */}
      <CardContentBox label="Color">
        <BotColorButtonGroup
          botColor={botColor}
          handleBotColorChange={handleBotColorChange}
        />
      </CardContentBox>
      {/* Box Time Control */}
      <CardContentBox label="Time Control">
        <BotTimeControlButtonGroup
          botTimeControlMode={botTimeControlMode}
          handleBotTimeControlModeChange={handleBotTimeControlModeChange}
        />
      </CardContentBox>
      {/* Box Minute Per Side */}
      <CardContentBox label={`Minutes Per Side: ${botTimeControlMinute}`}>
        <Slider
          value={botTimeControlMinute}
          onChange={handleBotTimeControlMinuteChange}
          max={180}
        />
      </CardContentBox>
      {/* Box Minute Per Side */}
      <CardContentBox label={`Increment in Second: ${botTimeControlIncrement}`}>
        <Slider
          value={botTimeControlIncrement}
          onChange={handleBotTimeControlIncrementChange}
          max={180}
        />
      </CardContentBox>
    </Box>
  );
}

export default BotCardContent;
