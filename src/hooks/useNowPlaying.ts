import { useEffect, useState } from "react";
import { get } from "../common/services/get";
import { Endpoints } from "../common/endpoints";
import type { NowPlaying, Response } from "../models";
import { useAzuraStore } from "./useAzuraStore";

// Varias vistas muestran "ahora suena" a la vez (reproductor, inicio, panel):
// se comparte una sola petición; después actualiza el WebSocket.
let pending: Promise<Response<NowPlaying>> | undefined;

/**
 * Pide "now playing" por la API y lo guarda en el store. También se usa al
 * reconectar el WebSocket (solo envía cambios, así que lo que sonó mientras
 * estaba caído se recupera aquí) y desde el botón "Reintentar".
 */
export const refreshNowPlaying = (): Promise<void> => {
  pending ??= get<NowPlaying>(Endpoints.NOW_PLAYING);
  return pending.then((resp) => {
    pending = undefined;
    const { setData, setAzuraError } = useAzuraStore.getState();
    if (!resp.error && resp.body?.now_playing) setData(resp.body);
    else setAzuraError(resp.message || "No se pudo consultar la emisora.");
  });
};

export const useNowPlaying = () => {
  const data = useAzuraStore((s) => s.data);
  const error = useAzuraStore((s) => s.azuraError);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (useAzuraStore.getState().data) return;
    let cancelled = false;
    refreshNowPlaying().then(() => {
      if (!cancelled) setSettled(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const isLive = Boolean(data?.live?.is_live);
  const song = data?.now_playing?.song;

  return {
    data,
    isLive,
    /** Título listo para mostrar: locutor si hay programa en vivo, canción si no. */
    title: isLive ? data?.live.streamer_name || "Programa en vivo" : song?.title,
    subtitle: isLive ? "En vivo ahora" : song?.artist,
    art: (isLive ? data?.live.art : undefined) || song?.art || undefined,
    isLoading: !data && !settled && !error,
    error: data ? undefined : error,
  };
};
