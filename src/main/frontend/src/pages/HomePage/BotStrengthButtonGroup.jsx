import React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

function BotStrengthGroupButton({ botStrength, handleBotStrengthChange }) {
  const buttonValues = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <ToggleButtonGroup
      value={botStrength}
      exclusive
      onChange={handleBotStrengthChange}
      size="large"
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
