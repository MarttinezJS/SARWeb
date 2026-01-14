import { App } from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider
        placement="bottom-right"
        toastProps={{
          radius: "full",
          timeout: 5000,
          shouldShowTimeoutProgress: true,
        }}
      />
      <App />
    </HeroUIProvider>
  </StrictMode>
);
