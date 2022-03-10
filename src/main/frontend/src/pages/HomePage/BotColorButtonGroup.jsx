import React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { setColor } from "store/reducers/botFormSlice";

import { BotColorEnum } from "./LocalEnums";

function BotColorButtonGroup() {
  const botColor = useSelector((state) => state.botForm.color);
  const dispatch = useDispatch();
  const handleBotColorChange = (_, value) => dispatch(setColor(value));

  return (
    <ToggleButtonGroup
      value={botColor}
      exclusive
      onChange={handleBotColorChange}
      sx={{ border: 1 }}
    >
      {Object.values(BotColorEnum).map((value) => (
        <ToggleButton
          key={value}
          value={value}
          disableFocusRipple
          disableRipple
        >
          <Typography variant="button" sx={{ paddingX: "0.5rem" }}>
            {value}
          </Typography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default BotColorButtonGroup;
