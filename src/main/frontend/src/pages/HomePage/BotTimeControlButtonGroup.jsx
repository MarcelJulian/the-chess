import React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

import { BotTimeControlEnum } from "./LocalEnums";

function BotTimeControlButtonGroup({
  botTimeControlMode,
  handleBotTimeControlModeChange
}) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={botTimeControlMode}
      exclusive
      onChange={handleBotTimeControlModeChange}
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
