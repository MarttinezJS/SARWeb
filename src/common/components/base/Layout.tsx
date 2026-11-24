import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Player } from "./Player";
import { PrayerFab } from "./PrayerFab";
import { ConnectionBanner } from "./ConnectionBanner";
import { addToast } from "@heroui/toast";
import { useCallback, useEffect, useRef, useState } from "react";
import { Points } from "../../../models";
import { get } from "../../services";
import { Endpoints } from "../../endpoints";
import { useAzuraStore } from "../../../hooks";

/**
 * URL del stream lista para el navegador. Icecast (AzuraCast) responde a la
 * primera petición con rango de Safari (`Range: bytes=0-1`) con un 302 que
 * añade `?_ic2=<marca>` y apunta a su host interno por http
 * (http://185.237.253.117:443/...): Safari lo bloquea por contenido mixto y
 * no suena. Si la URL ya trae `_ic2`, Icecast responde 200 sin redirigir.
 * También se fuerza https por si la API devolviera una URL http.
 */
const toStreamUrl = (raw: string | undefined): string | undefined => {
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    if (window.location.protocol === "https:") url.protocol = "https:";
    if (!url.searchParams.has("_ic2")) url.searchParams.set("_ic2", String(Date.now()));
    return url.toString();
  } catch {
    return raw;
  }
};

export const Layout = () => {
  const player = useRef<HTMLAudioElement>(null);
  const [url, setUrl] = useState<string | undefined>();
  const [volume, setVolume] = useState(0.8);
  // El botón de peticiones baja cuando el reproductor se esconde.
  const [playerCollapsed, setPlayerCollapsed] = useState(false);
  const { pathname, hash } = useLocation();
  const setStreamError = useAzuraStore((s) => s.setStreamError);
  const getPoints = useCallback(async () => {
    const resp = await get<Points[]>(Endpoints.POINTS);
    if (resp.error) {
      setStreamError(resp.message || "No se pudo obtener la señal de la radio.");
      addToast({
        title: "No se pudo conectar con la emisora",
        description: resp.message,
        color: "danger",
      });
      return;
    }
    return resp.body?.[0];
  }, [setStreamError]);
  // <audio> no tiene prop de volumen: se aplica directamente al elemento.
  useEffect(() => {
    if (player.current) player.current.volume = volume;
  }, [volume]);
  useEffect(() => {
    getPoints().then((resp) => {
      setUrl(toStreamUrl(resp?.url));
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
      <ConnectionBanner />
      <main id="contenido" className="mx-auto w-full max-w-7xl grow px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Outlet />
      </main>
      <Footer />
      <Player
        ref={player}
        onChangeVolume={setVolume}
        volume={volume}
        collapsed={playerCollapsed}
        onCollapsedChange={setPlayerCollapsed}
      />
      <PrayerFab playerCollapsed={playerCollapsed} />
      <audio
        ref={player}
        src={url}
        preload="none"
        // Con preload="none" solo hay error si alguien intentó reproducir.
        onError={() => setStreamError("La señal de audio no está disponible.")}
        onPlaying={() => setStreamError(undefined)}
      />
    </div>
  );
};
