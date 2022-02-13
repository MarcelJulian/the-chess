import React, { useState } from "react";

import { blue, brown, deepOrange } from "@material-ui/core/colors";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import { blueGrey, green, grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

import GBoard from "./components/Board";
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
      mode: "dark"
    }
  });
  const greenTheme = createTheme({
    palette: {
      primary: blueGrey,
      secondary: brown,
      neutral: {
        dark: grey[900],
        main: grey[500],
        light: grey[100]
      }
    }
  });
  const theme = createTheme({
    palette: { type: darkMode ? "dark" : "light" }
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : greenTheme}>
      {/* <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} /> */}
      {/* <IconButton
        onClick={() => {
          setDarkMode(!darkMode);
        }}
        onChange={<Brightness4Icon />}
        color="inherit"
        // Brightness4Icon
      >
        <Brightness7Icon />
        <Brightness4Icon />
      </IconButton> */}

      <Paper elevation={3} style={{ height: "100%" }}>
        <NavBar />
        {/* <HomePage /> */}
        {/* <HumanPage /> */}
        {/* <SettingsPageDialog />
        <GBoard /> */}
        <Routes>
          {/* <Route path="/" element={<NavBar />} /> */}
          {/* <Route path="/" element={<GBoard />} /> */}
          {/* <Route path="/" element={<HumanPage />} /> */}
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPageDialog />} />
        </Routes>

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
      </Paper>

      {/* <Paper elevation={3} /> */}
    </ThemeProvider>
  );
}
