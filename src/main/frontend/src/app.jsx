import React, { useState } from "react";

import { blueGrey, brown } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

import GamePage from "pages/GamePage";

import NavBar from "./components/NavBar";
import Toast from "./components/Toast";
import HomePage from "./pages/HomePage";
import SettingsPageDialog from "./pages/SettingsPage";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const themeHandler = () => setDarkMode(!darkMode);

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
        <NavBar themeHandler={themeHandler} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPageDialog />} />
        </Routes>
        <GamePage />
        <Toast />
      </Paper>
    </ThemeProvider>
  );
}
