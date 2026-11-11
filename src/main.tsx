import { App } from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider locale="es-CO">
      <ToastProvider
        placement="top-right"
        toastOffset={72}
        toastProps={{
          radius: "lg",
          timeout: 5000,
          shouldShowTimeoutProgress: true,
          // Texto en marrón: los tonos por defecto no contrastan con la paleta.
          classNames: { title: "text-secondary font-semibold", description: "text-muted" },
        }}
      />
      <App />
    </HeroUIProvider>
  </StrictMode>
);
