import React, { useState } from "react";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import { blueGrey, brown } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

import GBoard from "./components/Board";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
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
    },
    typography: {
      fontFamily: "Poppins"
    }
  });
  const greenTheme = createTheme({
    palette: {
      primary: { main: blueGrey[800] },
      secondary: brown
    },
    typography: {
      fontFamily: "Poppins"
    }
  });
  const theme = createTheme({
    palette: { type: darkMode ? "dark" : "light" }
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : greenTheme}>
      <CssBaseline />
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
        {/* <SettingsPageDialog />
        <GBoard /> */}
        <Routes>
          {/* <Route path="/" element={<NavBar />} /> */}
          {/* <Route path="/" element={<GBoard />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPageDialog />} />
        </Routes>
        <GBoard />
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
