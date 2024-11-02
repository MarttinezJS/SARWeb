import { useEffect } from "react";
import { ResponseModal, Router } from "./common";
import { Reproductor } from "./common/components/base/Reproductor";
import { Environment } from "./config/environment";
import { useAzuraStore } from "./hooks";

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
  }, []);

  return (
    <>
      <ResponseModal />
      <Reproductor />
      <Router />
    </>
  );
};
