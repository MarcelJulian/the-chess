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
  const theme = useTheme();

  const main = "#1B2B42";
  const light = "#5b7398";

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#3d5270",
        light,
        dark: "#4986ad",
        test: "#12376E"
      },
      secondary: brown,
      neutral: {
        darker: "#9E9E9E",
        main: "#212121",
        light: "#424242",
        darkest: "#212121"
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
            // backgroundColor: "#212124"
          }
        }
      }
    }
  });

  const greenTheme = createTheme({
    palette: {
      // complement of #ce835a
      primary: {
        main,
        light,
        dark: "#4986ad",
        test: "#12376E"
      },
      secondary: brown,
      neutral: {
        light: "#FAFAFA",
        main: "#F5F5F5",
        darkest: "#E0E0E0",
        darker: "#9e9e9e"
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
            // backgroundColor: "#f0fff0"
          }
        }
      }
      // Paper: {
      //   style: {
      //     backgroundColor: "#6897bb"
      //   }
      // }
    }
  });
  const isSettingsDialogShown = useSelector(
    (state) => state.ui.isSettingsDialogShown
  );
  // const backgroundColor = theme.palette.neutral.darker;
  const dispatch = useDispatch();
  return (
    <ThemeProvider theme={darkMode ? darkTheme : greenTheme}>
      <CssBaseline />

      <Paper
        sx={{
          height: "100%",
          backgroundColor: darkMode ? "grey[950]" : "#E0E0E0"
        }}
      >
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
