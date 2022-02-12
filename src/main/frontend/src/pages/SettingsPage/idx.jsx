import * as React from "react";

import { ButtonGroup, Card } from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { Button } from "@mui/material";
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
      borderRadius="1rem"
      boxShadow="3"
      sx={{
        // p: 2,
        // m: 1,
        // borderRadius: 2,
        marginLeft: "2%",
        marginRight: "2%",
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
          marginLeft="30%"
          marginRight="30%"
          marginBottom="5%"
          border="1px solid"
          borderRadius="1rem"
          boxShadow="3"
          // p="0.5rem"
          //   textAlign="Start"
          justifyContent="center"
          sx={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)" }}
        >
          <Item>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Board Theme</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Pilihan - pilihan board.</Typography>
              </AccordionDetails>
            </Accordion>
          </Item>
          <Item>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Piece Set</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Pilihan - pilihan piece.</Typography>
              </AccordionDetails>
            </Accordion>
          </Item>
          <Item>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Sound</Typography>
              </AccordionSummary>
              <AccordionDetails>
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
              </AccordionDetails>
            </Accordion>
          </Item>
          <Item>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Voice Control</Typography>
              </AccordionSummary>
              <AccordionDetails>
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
              </AccordionDetails>
            </Accordion>
          </Item>
          <Item>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Blind Control</Typography>
              </AccordionSummary>
              <AccordionDetails>
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
              </AccordionDetails>
            </Accordion>
          </Item>
          {/* <Slider disabled defaultValue={30} aria-label="Disabled slider" /> */}
        </Box>
      </Container>
    </>
  );
}

export default SettingsPageDialog;
