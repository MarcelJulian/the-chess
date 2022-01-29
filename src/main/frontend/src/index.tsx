import "./index.css";

import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom";

import HomePage from "pages/HomePage";

import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <HomePage />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
