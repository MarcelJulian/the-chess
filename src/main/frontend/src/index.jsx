import "./index.css";

import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./app";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* <MainMenu /> */}
    {/* <SettingsPageDialog /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
