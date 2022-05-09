import React, { useState, useEffect } from "react";

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
  const { timeControlMode, timeControlMinute, timeControlIncrement } =
    useSelector((state) => state.botForm);

  const calculateBoardHeight = () => {
    const screenHeight = document.documentElement.clientHeight;
    const totalHeight = document.documentElement.scrollHeight;

    return screenHeight < totalHeight;
  };
  const [isOverflow, setIsOverflow] = useState(calculateBoardHeight());

  useEffect(() => {
    function handleResize() {
      setIsOverflow(calculateBoardHeight());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dispatch = useDispatch();
  const handleBotTimeControlMinuteChange = (_, value) =>
    dispatch(setTimeControlMinute(value));
  const handleBotTimeControlIncrementChange = (_, value) =>
    dispatch(setTimeControlIncrement(value));

  return (
    <Box display="flex" flexDirection="column" sx={{ paddingX: "1rem" }}>
      {/* Box Strength Level AI */}
      <CardContentBox label="Strength">
        <BotStrengthButtonGroup size={isOverflow ? "small" : "medium"} />
      </CardContentBox>
      <Box display="flex" flexDirection={isOverflow ? "row" : "column"}>
        {/* Box color */}
        <CardContentBox label="Color">
          <BotColorButtonGroup size={isOverflow ? "small" : "medium"} />
        </CardContentBox>
        {/* Box Time Control */}
        <CardContentBox label="Time Control">
          <BotTimeControlButtonGroup size={isOverflow ? "small" : "medium"} />
        </CardContentBox>
      </Box>
      {/* Box Minute Per Side */}
      <CardContentBox label={`Minutes Per Side: ${timeControlMinute}`}>
        <Slider
          value={timeControlMinute}
          onChange={handleBotTimeControlMinuteChange}
          max={180}
          disabled={timeControlMode === "unlimited"}
        />
      </CardContentBox>
      {/* Box Minute Per Side */}
      <CardContentBox label={`Increment in Second: ${timeControlIncrement}`}>
        <Slider
          value={timeControlIncrement}
          onChange={handleBotTimeControlIncrementChange}
          max={60}
          disabled={timeControlMode === "unlimited"}
        />
      </CardContentBox>
    </Box>
  );
}

export default BotCardContent;
