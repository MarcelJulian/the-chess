import React, { useState } from "react";

import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { blueGrey, brown } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import GamePage from "pages/GamePage";
import { hideSettingsDialog } from "store/reducers/uiSlice";

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
  const isSettingsDialogShown = useSelector(
    (state) => state.ui.isSettingsDialogShown
  );

  const dispatch = useDispatch();
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
        <Dialog
          onClose={() => dispatch(hideSettingsDialog())}
          open={isSettingsDialogShown}
        >
          <DialogTitle>Settings</DialogTitle>
          <SettingsPageDialog />
        </Dialog>
      </Paper>
    </ThemeProvider>
  );
}
