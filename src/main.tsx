import { App } from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { SnackbarProvider } from "notistack";
import { LoadingSnackbar } from "./common";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <SnackbarProvider
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        Components={{
          loading: LoadingSnackbar,
        }}
      >
        <App />
      </SnackbarProvider>
    </NextUIProvider>
  </StrictMode>
);
