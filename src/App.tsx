import { useEffect } from "react";
import { Environment } from "./config/environment";
import { useAzuraStore } from "./hooks";
import { Routes } from "./Routes";

export const App = () => {
  const setAzuraResp = useAzuraStore((s) => s.setData);
  useEffect(() => {
    const socket = new WebSocket(Environment.VITE_WS_URL);
    socket.onopen = () => {
      console.log("Websocket connected");
    };
    socket.onmessage = (event: MessageEvent<string>) => {
      const resp = JSON.parse(event.data);
      setAzuraResp(resp);
    };
    socket.onclose = () => {
      console.log("Websocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, [setAzuraResp]);

  return <Routes />;
};
