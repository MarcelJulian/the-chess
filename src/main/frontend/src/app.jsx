import React, { useState } from "react";

import { brown } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useTheme from "@mui/material/styles/useTheme";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import NavBar from "components/NavBar";
import Toast from "components/Toast";
import GamePage from "pages/GamePage";
import HomePage from "pages/HomePage";
import SettingsPageDialog from "pages/SettingsPage";
import { hideSettingsDialog } from "store/reducers/uiSlice";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const themeHandler = () => setDarkMode(!darkMode);

  const typography = { fontFamily: "Poppins" };
  const MuiCard = {
    defaultProps: {
      elevation: 4,
      style: { borderRadius: "0.5rem" }
    }
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#2e3f5a",
        light: "#3d5270"
      },
      secondary: { main: "#5b7398" },
      neutral: {
        light: "#212121",
        main: "#333333",
        darker: "#515151",
        darkest: "#646464"
      }
    },
    typography,
    components: { MuiCard }
  });

  const greenTheme = createTheme({
    palette: {
      primary: {
        main: "#1B2B42",
        light: "#899cbd"
      },
      secondary: { main: "#1B2B42" },
      neutral: {
        light: "#FAFAFA",
        main: "#F5F5F5",
        darker: "#E0E0E0",
        darkest: "#9E9E9E"
      }
    },
    typography,
    components: { MuiCard }
  });
  const theme = darkMode ? darkTheme : greenTheme;

  const isSettingsDialogShown = useSelector(
    (state) => state.ui.isSettingsDialogShown
  );

  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Paper
        sx={{
          height: "100%",
          backgroundColor: theme.palette.neutral.light
        }}
      >
        <NavBar themeHandler={themeHandler} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path=":gameId" element={<GamePage />} />
        </Routes>

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
