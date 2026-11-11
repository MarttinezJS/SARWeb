import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Player } from "./Player";
import { addToast } from "@heroui/toast";
import { useCallback, useEffect, useRef, useState } from "react";
import { Points } from "../../../models";
import { get } from "../../services";

export const Layout = () => {
  const player = useRef<HTMLAudioElement>(null);
  const [url, setUrl] = useState<string | undefined>();
  const [volume, setVolume] = useState(0.8);
  const getPoints = useCallback(async () => {
    const resp = await get<Points[]>(`/stream/points`);
    if (resp.error) {
      addToast({
        title: resp.message,
        color: "danger",
      });
      return;
    }
    return resp.body?.[0];
  }, []);
  // <audio> no tiene prop de volumen: se aplica directamente al elemento.
  useEffect(() => {
    if (player.current) player.current.volume = volume;
  }, [volume]);
  useEffect(() => {
    getPoints().then((resp) => {
      setUrl(resp?.url);
    });
  }, [getPoints]);
  return (
    <div className="flex flex-col min-h-screen  transition-colors duration-500">
      <Navbar />
      <main className="px-4 sm:px-6 lg:px-10 py-8">
        <Outlet />
      </main>
      <Footer />
      <Player ref={player} onChangeVolume={setVolume} volume={volume} />
      <audio ref={player} src={url} preload="none" />
    </div>
  );
};
