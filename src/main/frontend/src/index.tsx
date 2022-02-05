import "./index.css";

import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom";

import BoardPage from "pages/BoardPage";
import HomePage from "pages/HomePage";
import HumanPage from "pages/HumanPage";
import SettingsPage from "pages/SettingsPage";

// import HumanPage from "pages/HumanPage";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <HomePage />
      <HumanPage />
      <SettingsPage />
      <BoardPage />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
