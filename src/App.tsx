import { useEffect } from "react";
import { ResponseModal, Router } from "./common";
import { Reproductor } from "./common/components/base/Reproductor";
import { Environment } from "./config/environment";
import { WebhookContext, WebsocketResp } from "./models";
import { useSongsStore, useStreamerStore } from "./hooks";

export const App = () => {
  const setChangeSong = useSongsStore((s) => s.setData);
  const setStreamer = useStreamerStore((s) => s.setData);
  useEffect(() => {
    const socket = new WebSocket(Environment.VITE_WS_URL);
    socket.onopen = () => {
      console.log("Websocket connected");
    };
    socket.onmessage = (event: MessageEvent<string>) => {
      const resp = JSON.parse(event.data) as WebsocketResp;
      switch (resp.action) {
        case WebhookContext.CHANGE_SONG:
          setChangeSong(resp.data);
          break;
        case WebhookContext.LIVE:
          setStreamer(resp.data);
          break;

        default:
          break;
      }
      console.log(resp);
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
