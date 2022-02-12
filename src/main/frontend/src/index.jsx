import "./index.css";

import React from "react";

import { ChakraProvider, GridItem } from "@chakra-ui/react";
import { brown } from "@material-ui/core/colors";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { green } from "@mui/material/colors";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { height, width } from "@mui/system";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./app";
import NavBar from "./components/NavBar";
import MainMenu from "./MainMenu";
import BoardPage from "./pages/BoardPage";
import HomePage from "./pages/HomePage";
import HumanPage from "./pages/HumanPage";
import SettingsPage from "./pages/SettingsPage";
import SettingsPageDialog from "./pages/SettingsPage/idx";
// import HumanPage from "pages/HumanPage";

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

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
    {/* <MainMenu /> */}
    {/* <SettingsPageDialog /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
