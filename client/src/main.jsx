import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthProvider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <AuthProvider>
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
  </StrictMode>
);