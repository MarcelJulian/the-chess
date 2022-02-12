import React, { useState } from "react";

import { Card } from "@material-ui/core";
import { brown } from "@material-ui/core/colors";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Masonry from "@mui/lab/Masonry";
import {
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { green } from "@mui/material/colors";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { height, width } from "@mui/system";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      textAlign="center"
      sx={{
        // m: 1,
        // borderRadius: 2,
        // fontSize: "1rem",
        // fontWeight: "700",
        ...sx
      }}
      {...other}
    />
  );
}
const heights = [150, 30, 90, 70, 90, 100, 150, 30, 50, 80];
export default function MainMenu() {
  return (
    <Paper elevation={3} style={{ height: "100%", width: "100%" }}>
      <Container>
        <Box
          elevation={10}
          border="1px solid"
          borderRadius="1rem"
          boxShadow="3"
          // p="0.1rem"
          marginLeft="30%"
          marginRight="30%"
          justifyContent="center"
          sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          <Box gridColumn="span 2" borderBottom="1px solid">
            <Typography
              textAlign="center"
              variant="h6"
              component="div"
              gutterBottom
              color="primary"
            >
              Play With
            </Typography>
          </Box>
          <Box borderRight="1px solid">
            <Button sx={{ width: "100%", height: "100%" }}>Bot</Button>
          </Box>

          <Box>
            <Button sx={{ width: "100%", height: "100%" }}>Human</Button>
          </Box>
        </Box>

        <Box
          elevation={10}
          // border="1px solid"
          borderRadius="1rem"
          boxShadow="3"
          // p="0.1rem"
          marginTop="2%"
          marginLeft="30%"
          marginRight="30%"
          justifyContent="center"
          sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          <Item
            marginTop="10%"
            marginLeft="10%"
            marginBottom="5%"
            marginRight="5%"
            border="1px solid"
            borderRadius="1rem"
            elevation={3}
          >
            <Button borderRadius="1rem" sx={{ width: "100%" }}>
              <Typography variant="h6" textAlign="center" fontSize={20}>
                5 + 3
              </Typography>
            </Button>
          </Item>
          <Item
            marginTop="10%"
            marginLeft="5%"
            marginBottom="5%"
            marginRight="5%"
            border="1px solid"
            borderRadius="1rem"
            elevation={3}
          >
            <Button width="100%" borderRadius="1rem" sx={{ width: "100%" }}>
              <Typography variant="h6" textAlign="center" fontSize={20}>
                10 + 0
              </Typography>
            </Button>
          </Item>
          <Item
            marginTop="10%"
            marginLeft="5%"
            marginBottom="5%"
            marginRight="10%"
            border="1px solid"
            borderRadius="1rem"
            elevation={3}
          >
            <Button width="100%" borderRadius="1rem" sx={{ width: "100%" }}>
              <Typography variant="h6" textAlign="center" fontSize={20}>
                10 + 5
              </Typography>
            </Button>
          </Item>
          <Item
            marginTop="10%"
            marginLeft="10%"
            marginBottom="10%"
            marginRight="5%"
            border="1px solid"
            borderRadius="1rem"
            elevation={3}
          >
            <Button width="100%" borderRadius="1rem" sx={{ width: "100%" }}>
              <Typography variant="h6" textAlign="center" fontSize={20}>
                15 + 10
              </Typography>
            </Button>
          </Item>
          <Item
            marginTop="10%"
            marginLeft="5%"
            marginBottom="10%"
            marginRight="5%"
            border="1px solid"
            borderRadius="1rem"
            elevation={3}
          >
            <Button width="100%" borderRadius="1rem" sx={{ width: "100%" }}>
              <Typography variant="h6" textAlign="center" fontSize={20}>
                30 + 0
              </Typography>
            </Button>
          </Item>
          <Item
            marginTop="10%"
            marginLeft="5%"
            marginBottom="10%"
            marginRight="10%"
            border="1px solid"
            borderRadius="1rem"
            elevation={3}
          >
            <Button width="100%" borderRadius="1rem" sx={{ width: "100%" }}>
              <Typography variant="h6" textAlign="center" fontSize={20}>
                30 + 20
              </Typography>
            </Button>
          </Item>
        </Box>
      </Container>
    </Paper>
  );
}
