import React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useSelector, useDispatch } from "react-redux";

import {
  setTimeControlMinute,
  setTimeControlIncrement
} from "store/reducers/botFormSlice";

import BotColorButtonGroup from "./BotColorButtonGroup";
import BotStrengthButtonGroup from "./BotStrengthButtonGroup";
import BotTimeControlButtonGroup from "./BotTimeControlButtonGroup";
import CardContentBox from "./CardContentBox";

function BotCardContent() {
  const { timeControlMinute, timeControlIncrement } = useSelector(
    (state) => state.botForm
  );

  const dispatch = useDispatch();
  const handleBotTimeControlMinuteChange = (_, value) =>
    dispatch(setTimeControlMinute(value));
  const handleBotTimeControlIncrementChange = (_, value) =>
    dispatch(setTimeControlIncrement(value));

  return (
    <Box display="flex" flexDirection="column" sx={{ paddingX: "4rem" }}>
      {/* Box Strength Level AI */}
      <CardContentBox label="Strength">
        <BotStrengthButtonGroup />
      </CardContentBox>
      {/* Box color */}
      <CardContentBox label="Color">
        <BotColorButtonGroup />
      </CardContentBox>
      {/* Box Time Control */}
      <CardContentBox label="Time Control">
        <BotTimeControlButtonGroup />
      </CardContentBox>
      {/* Box Minute Per Side */}
      <CardContentBox label={`Minutes Per Side: ${timeControlMinute}`}>
        <Slider
          value={timeControlMinute}
          onChange={handleBotTimeControlMinuteChange}
          max={180}
        />
      </CardContentBox>
      {/* Box Minute Per Side */}
      <CardContentBox label={`Increment in Second: ${timeControlIncrement}`}>
        <Slider
          value={timeControlIncrement}
          onChange={handleBotTimeControlIncrementChange}
          max={180}
        />
      </CardContentBox>
    </Box>
  );
}

export default BotCardContent;
