import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18n"; // i18n configuration for internationalization

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
