import { useEffect } from "react";
import { Environment } from "./config/environment";
import { refreshNowPlaying, useAzuraStore } from "./hooks";
import { Routes } from "./Routes";

const MAX_RETRY_MS = 30_000;
// Cortes breves (Safari corta el socket al suspender la pestaña o cambiar de
// red) se recuperan solos: el aviso solo aparece si no reconecta en este tiempo.
const DOWN_AFTER_MS = 8_000;

export const App = () => {
  const setAzuraResp = useAzuraStore((s) => s.setData);
  const setWsStatus = useAzuraStore((s) => s.setWsStatus);

  // WebSocket "now playing" con reconexión automática (backoff exponencial):
  // antes, si el servidor se reiniciaba o la red parpadeaba, la canción en
  // pantalla dejaba de actualizarse hasta recargar la página.
  useEffect(() => {
    let socket: WebSocket | undefined;
    let retries = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let downTimer: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;
    let everOpened = false;

    const markDownLater = () => {
      downTimer ??= setTimeout(() => setWsStatus("down"), DOWN_AFTER_MS);
    };

    const connect = () => {
      clearTimeout(timer);
      timer = undefined;
      socket = new WebSocket(Environment.VITE_WS_URL);
      socket.onopen = () => {
        clearTimeout(downTimer);
        downTimer = undefined;
        // Tras un corte se piden los datos actuales: el socket solo envía cambios.
        if (everOpened) void refreshNowPlaying();
        everOpened = true;
        retries = 0;
        setWsStatus("open");
      };
      socket.onmessage = (event: MessageEvent<string>) => {
        try {
          const payload = JSON.parse(event.data);
          // Solo se acepta el payload "now playing" completo.
          if (payload?.now_playing?.song) setAzuraResp(payload);
        } catch {
          // mensaje no válido: se ignora
        }
      };
      socket.onclose = () => {
        if (stopped) return;
        markDownLater();
        const delay = Math.min(1000 * 2 ** retries, MAX_RETRY_MS);
        retries++;
        timer = setTimeout(connect, delay);
      };
    };

    // Al volver a la pestaña o recuperar la red, reconecta sin esperar el backoff.
    const reconnectNow = () => {
      if (document.visibilityState !== "visible") return;
      if (socket && socket.readyState <= WebSocket.OPEN) return;
      retries = 0;
      connect();
    };

    markDownLater();
    connect();
    document.addEventListener("visibilitychange", reconnectNow);
    window.addEventListener("online", reconnectNow);

    return () => {
      stopped = true;
      clearTimeout(timer);
      clearTimeout(downTimer);
      document.removeEventListener("visibilitychange", reconnectNow);
      window.removeEventListener("online", reconnectNow);
      socket?.close();
    };
  }, [setAzuraResp, setWsStatus]);

  return <Routes />;
};
