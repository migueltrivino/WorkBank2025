// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ToastProvider from "./components/toast/ToastProvider"; // ✅ import default
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToastProvider>
  </React.StrictMode>
);
