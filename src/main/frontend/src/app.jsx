import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import HelpDialog from "components/HelpDialog";
import NavBar from "components/NavBar";
import SettingsDialog from "components/SettingsDialog";
import { lightTheme, darkTheme } from "components/Theme";
import Toast from "components/Toast";
import GamePage from "pages/GamePage";
import HomePage from "pages/HomePage";
import { hideSettingsDialog, hideHelpDialog } from "store/reducers/uiSlice";

export default function App() {
  const { isDarkMode, isSettingsDialogShown, isHelpDialogShown } = useSelector(
    (state) => state.ui
  );
  const theme = isDarkMode ? darkTheme : lightTheme;

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
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path=":gameId" element={<GamePage />} />
          <Route path="/tutorial" element={<GamePage isTutorial />} />
        </Routes>

        <Toast />
        <Dialog
          onClose={() => dispatch(hideSettingsDialog())}
          open={isSettingsDialogShown}
        >
          <DialogTitle
            sx={{
              backgroundColor: theme.palette.neutral.main
            }}
          >
            Settings
          </DialogTitle>
          <SettingsDialog />
        </Dialog>

        <Dialog
          onClose={() => dispatch(hideHelpDialog())}
          open={isHelpDialogShown}
        >
          <DialogTitle
            sx={{
              backgroundColor: theme.palette.neutral.main
            }}
          >
            Help
          </DialogTitle>
          <HelpDialog />
        </Dialog>
      </Paper>
    </ThemeProvider>
  );
}
