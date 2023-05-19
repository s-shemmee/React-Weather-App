import React from "react";
import ReactDOM from "react-dom";
import { StrictMode } from "react";

import App from "./components/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
