import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
// import "./App.css";
import "./output.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/yoshi_portfolio">
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
