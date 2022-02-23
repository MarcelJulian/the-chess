import React, { useState } from "react";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { blueGrey, brown } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

import GamePage from "pages/GamePage";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SettingsPageDialog from "./pages/SettingsPage/idx";

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

  return (
    <ThemeProvider theme={darkMode ? darkTheme : greenTheme}>
      <CssBaseline />

      <Paper style={{ height: "100%" }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPageDialog />} />
        </Routes>
        <GamePage />
        <IconButton
          onClick={() => {
            setDarkMode(!darkMode);
          }}
          onChange={<Brightness4Icon />}
          color="inherit"
        >
          <Brightness7Icon />
          <Brightness4Icon />
        </IconButton>
      </Paper>
    </ThemeProvider>
  );
}
