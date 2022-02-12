import React, { useState } from "react";

import { GridItem } from "@chakra-ui/react";
import { blue, brown, deepOrange } from "@material-ui/core/colors";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { blueGrey, green } from "@mui/material/colors";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { height, width } from "@mui/system";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import MainMenu from "./MainMenu";
import HomePage from "./pages/HomePage";
import HumanPage from "./pages/HumanPage";
import SettingsPage from "./pages/SettingsPage";
import SettingsPageDialog from "./pages/SettingsPage/idx";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
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

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: blue
    }
  });
  const greenTheme = createTheme({
    palette: {
      primary: blueGrey,
      secondary: brown
    }
  });
  const theme = createTheme({
    palette: { type: darkMode ? "dark" : "light" }
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : greenTheme}>
      {/* <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} /> */}
      <IconButton
        onClick={() => {
          setDarkMode(!darkMode);
        }}
        onChange={<Brightness4Icon />}
        color="inherit"
        // Brightness4Icon
      >
        <Brightness7Icon />
        <Brightness4Icon />
      </IconButton>

      <Paper elevation={3} style={{ height: "100%" }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/settings" element={<SettingsPageDialog />} />
        </Routes>
      </Paper>

      {/* <Paper elevation={3} /> */}
    </ThemeProvider>
  );
}
