import "./index.css";

import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom";

import HomePage from "pages/HomePage";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <HomePage />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
