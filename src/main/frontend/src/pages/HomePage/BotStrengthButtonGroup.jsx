import React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";

import { setStrength } from "store/reducers/botFormSlice";

function BotStrengthGroupButton() {
  const buttonValues = [1, 2, 3, 4, 5, 6, 7, 8];

  const botStrength = useSelector((state) => state.botForm.strength);
  const dispatch = useDispatch();
  const handleBotStrengthChange = (_, value) => dispatch(setStrength(value));

  return (
    <ToggleButtonGroup
      value={botStrength}
      exclusive
      onChange={handleBotStrengthChange}
      sx={{ border: 1 }}
    >
      {buttonValues.map((value) => (
        <ToggleButton value={value} disableFocusRipple disableRipple>
          <Typography variant="button" sx={{ paddingX: "0.5rem" }}>
            {value}
          </Typography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default BotStrengthGroupButton;
