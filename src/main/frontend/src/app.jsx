import React, { useState } from "react";

import { brown, grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import GamePage from "pages/GamePage";
import HomePage from "pages/HomePage";
import { hideSettingsDialog } from "store/reducers/uiSlice";

import NavBar from "./components/NavBar";
import Toast from "./components/Toast";
import SettingsPageDialog from "./pages/SettingsPage";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const themeHandler = () => setDarkMode(!darkMode);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#5aa5ce", light: "#bae3f0", dark: "#4986ad" },
      secondary: brown,
      neutral: {
        light: grey[50],
        main: grey[100],
        darker: grey[300],
        darkest: grey[500]
      }
    },
    typography: {
      fontFamily: "Poppins"
    }
  });
  const greenTheme = createTheme({
    palette: {
      // complement of #ce835a
      primary: { main: "#5aa5ce", light: "#bae3f0", dark: "#4986ad" },
      secondary: brown,
      neutral: {
        light: grey[50],
        main: grey[100],
        darker: grey[300],
        darkest: grey[500]
      }
    },
    typography: {
      fontFamily: "Poppins"
    },
    components: {
      MuiCard: {
        defaultProps: {
          elevation: 4,
          style: {
            borderRadius: "0.5rem"
          }
        }
      }
    }
  });
  const isSettingsDialogShown = useSelector(
    (state) => state.ui.isSettingsDialogShown
  );

  const dispatch = useDispatch();
  return (
    <ThemeProvider theme={darkMode ? darkTheme : greenTheme}>
      <CssBaseline />

      <Paper sx={{ height: "100%", backgroundColor: grey[50] }}>
        <NavBar themeHandler={themeHandler} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path=":gameId" element={<GamePage />} />
        </Routes>
        {/* <GamePage /> */}

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
