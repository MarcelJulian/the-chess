/* eslint-disable import/no-unresolved */
import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";

import { setBoardSet, setPieceSet } from "store/reducers/boardSlice";

function ColumnBox(props) {
  const { sx, ...other } = props;
  return (
    <Box display="flex" flexDirection="column" marginBottom="1rem" {...other} />
  );
}

function SettingsPageDialog() {
  const [value, setValue] = React.useState(30);
  const pieceSet = useSelector((state) => state.board.pieceSet);
  const boardSet = useSelector((state) => state.board.boardSet);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();

  const handlePieceSetChange = (_, variable) => dispatch(setPieceSet(variable));
  const handleBoardSetChange = (_, boardVar) => dispatch(setBoardSet(boardVar));

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

  return (
    <Container>
      <Box
        marginBottom="2rem"
        justifyContent="center"
        // sx={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)" }}
      >
        <ColumnBox>
          <Typography>Board Theme</Typography>

          {generateBoardSetButtonGroup()}
        </ColumnBox>

        <ColumnBox>
          <Typography>Piece Set</Typography>

          {generatePieceSetButtonGroup()}
        </ColumnBox>

        <ColumnBox>
          <Typography>Voice Control</Typography>

          <Box
            elevation={10}
            border="1px solid"
            borderRadius="1rem"
            boxShadow="3"
            marginLeft="30%"
            marginRight="30%"
            justifyContent="center"
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)"
            }}
          >
            <Button sx={{ width: "100%", height: "100%" }}>On</Button>
            <Button sx={{ width: "100%", height: "100%" }}>Off</Button>
          </Box>
        </ColumnBox>

        <ColumnBox>
          <Typography>Blind Control</Typography>

          <Box
            elevation={10}
            border="1px solid"
            borderRadius="1rem"
            boxShadow="3"
            marginLeft="30%"
            marginRight="30%"
            justifyContent="center"
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)"
            }}
          >
            <Button sx={{ width: "100%", height: "100%" }}>On</Button>
            <Button sx={{ width: "100%", height: "100%" }}>Off</Button>
          </Box>
        </ColumnBox>

        {/* <Slider disabled defaultValue={30} aria-label="Disabled slider" /> */}
      </Box>
    </Container>
  );
}

export default SettingsPageDialog;
