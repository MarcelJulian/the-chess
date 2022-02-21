import React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";

import { setTimeControlMode } from "store/reducers/botFormSlice";

import { BotTimeControlEnum } from "./LocalEnums";

function BotTimeControlButtonGroup() {
  const botTimeControlMode = useSelector(
    (state) => state.botForm.timeControlMode
  );
  const dispatch = useDispatch();
  const handleBotTimeControlModeChange = (_, value) =>
    dispatch(setTimeControlMode(value));

  return (
    <ToggleButtonGroup
      value={botTimeControlMode}
      exclusive
      onChange={handleBotTimeControlModeChange}
      sx={{ border: 1 }}
    >
      {Object.values(BotTimeControlEnum).map(({ value, label }) => (
        <ToggleButton value={value} disableFocusRipple disableRipple>
          <Typography variant="button" sx={{ paddingX: "0.5rem" }}>
            {label}
          </Typography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default BotTimeControlButtonGroup;
