import "./index.css";

import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom";

import HomePage from "pages/HomePage";
import HumanPage from "pages/HumanPage/index_human";
import SettingsPage from "pages/SettingsPage/settingsPage";
// import HumanPage from "pages/HumanPage";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <HomePage />
      <HumanPage />
      <SettingsPage />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
