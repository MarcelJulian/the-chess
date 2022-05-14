/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useTheme from "@mui/material/styles/useTheme";
import Switch from "@mui/material/Switch";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";

import {
  setBoardSet,
  setPieceSet,
  setIsSpeech,
  setIsBlind,
  setKey,
  setConfirmKey
} from "store/reducers/settingsSlice";

function ColumnBox(props) {
  const { ...other } = props;
  return (
    <Box display="flex" flexDirection="column" marginBottom="1rem" {...other} />
  );
}

function RowBox(props) {
  const { ...other } = props;
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      marginBottom="1rem"
      {...other}
    />
  );
}

function SettingsDialog() {
  const { pieceSet, boardSet, isSpeech, isBlind, key, confirmKey } =
    useSelector((state) => state.settings);

  const theme = useTheme();
  const backgroundColor = theme.palette.neutral.main;

  const dispatch = useDispatch();

  // Board & Piece Toggle
  const handleBoardSetChange = (_, boardVar) => dispatch(setBoardSet(boardVar));
  const handlePieceSetChange = (_, variable) => dispatch(setPieceSet(variable));

  const generateBoardSetButtonGroup = () => {
    const buttons = [];
    const values = ["tile1", "tile2", "tile3", "tile4", "tile5"];

    values.forEach((val) => {
      buttons.push(
        <ToggleButton
          value={val}
          key={val}
          disableFocusRipple
          disableRipple
          sx={{
            height: "4.5rem",
            width: "4.5rem",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${process.env.PUBLIC_URL}/tile_set/preview/${val}.jpg)`,
            backgroundSize: "80%",
            backgroundPosition: "center"
          }}
        />
      );
    });
    return (
      <ToggleButtonGroup
        value={boardSet}
        color="secondary"
        exclusive
        onChange={handleBoardSetChange}
      >
        {buttons}
      </ToggleButtonGroup>
    );
  };

  const generatePieceSetButtonGroup = () => {
    const buttons = [];
    const values = ["piece1", "piece2", "piece3", "piece4", "piece5"];

    values.forEach((val) => {
      buttons.push(
        <ToggleButton
          value={val}
          key={val}
          disableFocusRipple
          disableRipple
          sx={{
            height: "4.5rem",
            width: "4.5rem",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${process.env.PUBLIC_URL}/piece_set/${val}/bN.png)`,
            backgroundSize: "100%"
          }}
        />
      );
    });
    return (
      <ToggleButtonGroup
        value={pieceSet}
        color="secondary"
        exclusive
        onChange={handlePieceSetChange}
      >
        {buttons}
      </ToggleButtonGroup>
    );
  };

  // Keybind
  const [isRecordKeySelected, setIsRecordKeySelected] = useState(false);
  const [isConfirmKeySelected, setIsConfirmKeySelected] = useState(false);

  const isRecordKeySelectedHandler = () => {
    if (isConfirmKeySelected) setIsConfirmKeySelected(false);
    setIsRecordKeySelected(!isRecordKeySelected);
  };

  const isConfirmKeySelectedHandler = () => {
    if (isRecordKeySelected) setIsRecordKeySelected(false);
    setIsConfirmKeySelected(!isConfirmKeySelected);
  };

  // set focus on page load for keyboard events
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);

  const onKeyDownHandler = (e) => {
    if (isRecordKeySelected) {
      dispatch(setKey(e.key));
      setIsRecordKeySelected(false);
    } else if (isConfirmKeySelected) {
      dispatch(setConfirmKey(e.key));
      setIsConfirmKeySelected(false);
    }
  };

  return (
    <Container
      sx={{ backgroundColor }}
      tabIndex="0"
      ref={ref}
      onKeyDown={onKeyDownHandler}
    >
      <Box marginBottom="2rem" justifyContent="center">
        <ColumnBox>
          <Typography>Board Theme</Typography>
          {generateBoardSetButtonGroup()}
        </ColumnBox>

        <ColumnBox>
          <Typography>Piece Set</Typography>
          {generatePieceSetButtonGroup()}
        </ColumnBox>

        <RowBox>
          <ColumnBox marginBottom="none">
            <Typography>Speech Synthethizer</Typography>
            <Typography variant="caption">
              Enable to voice chess moves
            </Typography>
          </ColumnBox>
          <Switch
            color="secondary"
            checked={isSpeech}
            onChange={(e) => dispatch(setIsSpeech(e.target.checked))}
          />
        </RowBox>

        <RowBox>
          <ColumnBox marginBottom="none">
            <Typography>Blind Mode</Typography>
            <Typography variant="caption">
              Enable to hide chess pieces and moves
            </Typography>
          </ColumnBox>
          <Switch
            color="secondary"
            checked={isBlind}
            onChange={(e) => dispatch(setIsBlind(e.target.checked))}
          />
        </RowBox>

        <ColumnBox>
          <Typography>Keybind</Typography>
          <Typography variant="caption">
            Select the key, then press any key to change.
          </Typography>

          <RowBox marginBottom="0.25rem">
            <Typography variant="body2">Record</Typography>
            <ToggleButton
              value="recordKey"
              color="neutralButton"
              size="small"
              disableRipple
              disableFocusRipple
              sx={{ borderRadius: "0.5rem" }}
              selected={isRecordKeySelected}
              onChange={isRecordKeySelectedHandler}
            >
              {key}
            </ToggleButton>
          </RowBox>
          <RowBox marginBottom="none">
            <Typography variant="body2">Confirm</Typography>
            <ToggleButton
              value="confirmKey"
              variant="contained"
              color="neutralButton"
              size="small"
              disableRipple
              disableFocusRipple
              sx={{ borderRadius: "0.5rem" }}
              selected={isConfirmKeySelected}
              onChange={isConfirmKeySelectedHandler}
            >
              {confirmKey}
            </ToggleButton>
          </RowBox>
        </ColumnBox>

        {/* <Slider disabled defaultValue={30} aria-label="Disabled slider" /> */}
      </Box>
    </Container>
  );
}

export default SettingsDialog;
