import { App } from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { SnackbarProvider } from "notistack";
import { LoadingSnackbar } from "./common";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
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
    </HeroUIProvider>
  </StrictMode>
);
