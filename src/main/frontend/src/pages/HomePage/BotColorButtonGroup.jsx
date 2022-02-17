import React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

import { BotColorEnum } from "./LocalEnums";

function BotColorButtonGroup({ botColor, handleBotColorChange }) {
  return (
    <ToggleButtonGroup
      value={botColor}
      exclusive
      onChange={handleBotColorChange}
      size="large"
      sx={{ border: 1 }}
    >
      {Object.values(BotColorEnum).map((value) => (
        <ToggleButton value={value} disableFocusRipple disableRipple>
          <Typography variant="button" sx={{ paddingX: "0.5rem" }}>
            {value}
          </Typography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default BotColorButtonGroup;
