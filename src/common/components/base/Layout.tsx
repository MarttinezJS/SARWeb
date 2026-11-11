import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Player } from "./Player";
import { addToast } from "@heroui/toast";
import { useCallback, useEffect, useRef, useState } from "react";
import { Points } from "../../../models";
import { get } from "../../services";
import { Endpoints } from "../../endpoints";

export const Layout = () => {
  const player = useRef<HTMLAudioElement>(null);
  const [url, setUrl] = useState<string | undefined>();
  const [volume, setVolume] = useState(0.8);
  const { pathname, hash } = useLocation();
  const getPoints = useCallback(async () => {
    const resp = await get<Points[]>(Endpoints.POINTS);
    if (resp.error) {
      addToast({
        title: "No se pudo conectar con la emisora",
        description: resp.message,
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
  // Cada página empieza arriba, o en la sección del ancla (#registro). El
  // reproductor sigue sonando al navegar.
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-secondary focus:px-4 focus:py-2 focus:text-secondary-foreground"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido" className="mx-auto w-full max-w-7xl grow px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Outlet />
      </main>
      <Footer />
      <Player ref={player} onChangeVolume={setVolume} volume={volume} />
      <audio ref={player} src={url} preload="none" />
    </div>
  );
};
