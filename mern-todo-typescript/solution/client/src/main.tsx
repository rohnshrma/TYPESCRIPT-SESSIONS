import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { fail } from "./utils/helpers";
import "./App.css";

const rootElement = document.getElementById("root");

// getElementById can return null, so narrow it first
if (rootElement === null) {
  fail("Root element #root was not found");
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
