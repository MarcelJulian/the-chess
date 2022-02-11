import "./index.css";

import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import BoardPage from "./pages/BoardPage";
import HomePage from "./pages/HomePage";
import HumanPage from "./pages/HumanPage";
import SettingsPage from "./pages/SettingsPage";
import SettingsPageDialog from "./pages/SettingsPage/idx";

// import HumanPage from "pages/HumanPage";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>

        <HumanPage />

        {/* <BoardPage /> */}
      </BrowserRouter>
    </ChakraProvider>
    <SettingsPageDialog />
  </React.StrictMode>,
  document.getElementById("root")
);
