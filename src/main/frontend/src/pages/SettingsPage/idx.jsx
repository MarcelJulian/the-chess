import * as React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

import ToggleColorMode from "../../components/Theme";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        // border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        p: 2,
        // m: 1,
        // borderRadius: 2,
        fontSize: "1rem",
        fontWeight: "700",
        ...sx
      }}
      {...other}
    />
  );
}

function SettingsPageDialog() {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [chooseTile, setTile] = React.useState("");

  const handleChangeTile = (event) => {
    setTile(event.target.value);
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleChangeAcor = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <CssBaseline />
      <Container>
        <Box
          border="1px solid"
          borderRadius="1rem"
          boxShadow="3"
          borderColor="black"
          p="0.5rem"
          marginLeft="30%"
          marginRight="30%"
          //   textAlign="Start"
          justifyContent="center"
          sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          <Item mt="10%">Board Theme</Item>
          <Item>
            <Box justifyContent="Center">
              <FormControl variant="standard" sx={{ m: 0, minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Choose Tile
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={handleChangeTile}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Pilihan 1</MenuItem>
                  <MenuItem value={20}>Pilihan 2</MenuItem>
                  <MenuItem value={30}>Pilihan 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Item>
          <Item mt="10%">Piece Set</Item>
          <Item>
            <Box>
              <FormControl variant="standard" sx={{ m: 0, minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Choose Piece Set
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={handleChangeTile}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Pilihan 1</MenuItem>
                  <MenuItem value={20}>Pilihan 2</MenuItem>
                  <MenuItem value={30}>Pilihan 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Item>
          <Item mt="5%">Sound</Item>
          <Item>
            <Stack
              //   spacing={0}
              direction="row"
              //   sx={{ mb: 5 }}
              alignItems="center"
            >
              <VolumeDown />
              <Slider
                aria-label="Volume"
                value={value}
                onChange={handleChange}
              />
              <VolumeUp />
            </Stack>
          </Item>
          <Item>Voice Control</Item>
          <Item>2</Item>
          <Item>Blind Mode</Item>
          <Item>2</Item>
          <Item>Theme</Item>
          <Item>
            <ToggleColorMode />
          </Item>
          {/* <Slider disabled defaultValue={30} aria-label="Disabled slider" /> */}
        </Box>
      </Container>
    </>
  );
}

export default SettingsPageDialog;
