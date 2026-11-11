import { useEffect } from "react";
import { Environment } from "./config/environment";
import { useAzuraStore } from "./hooks";
import { Routes } from "./Routes";

const MAX_RETRY_MS = 30_000;

export const App = () => {
  const setAzuraResp = useAzuraStore((s) => s.setData);

  // WebSocket "now playing" con reconexión automática (backoff exponencial):
  // antes, si el servidor se reiniciaba o la red parpadeaba, la canción en
  // pantalla dejaba de actualizarse hasta recargar la página.
  useEffect(() => {
    let socket: WebSocket | undefined;
    let retries = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;

    const connect = () => {
      socket = new WebSocket(Environment.VITE_WS_URL);
      socket.onopen = () => {
        retries = 0;
      };
      socket.onmessage = (event: MessageEvent<string>) => {
        try {
          setAzuraResp(JSON.parse(event.data));
        } catch {
          // mensaje no válido: se ignora
        }
      };
      socket.onclose = () => {
        if (stopped) return;
        const delay = Math.min(1000 * 2 ** retries, MAX_RETRY_MS);
        retries++;
        timer = setTimeout(connect, delay);
      };
    };
    connect();

    return () => {
      stopped = true;
      clearTimeout(timer);
      socket?.close();
    };
  }, [setAzuraResp]);

  return <Routes />;
};
