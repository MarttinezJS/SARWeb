import { useEffect, useState } from "react";
import { get } from "../common/services/get";
import { Endpoints } from "../common/endpoints";
import type { NowPlaying, Response } from "../models";
import { useAzuraStore } from "./useAzuraStore";

// Varias vistas muestran "ahora suena" a la vez (reproductor, inicio, panel):
// se comparte una sola petición inicial; después actualiza el WebSocket.
let pending: Promise<Response<NowPlaying>> | undefined;

export const useNowPlaying = () => {
  const data = useAzuraStore((s) => s.data);
  const setData = useAzuraStore((s) => s.setData);
  const [error, setError] = useState<string>();
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (useAzuraStore.getState().data) return;
    let cancelled = false;
    pending ??= get<NowPlaying>(Endpoints.NOW_PLAYING);
    pending.then((resp) => {
      pending = undefined;
      if (cancelled) return;
      if (!resp.error && resp.body?.now_playing) setData(resp.body);
      else setError(resp.message || "No se pudo consultar la emisora.");
      setSettled(true);
    });
    return () => {
      cancelled = true;
    };
  }, [setData]);

  const isLive = Boolean(data?.live?.is_live);
  const song = data?.now_playing?.song;

  return {
    data,
    isLive,
    /** Título listo para mostrar: locutor si hay programa en vivo, canción si no. */
    title: isLive ? data?.live.streamer_name || "Programa en vivo" : song?.title,
    subtitle: isLive ? "En vivo ahora" : song?.artist,
    art: (isLive ? data?.live.art : undefined) || song?.art || undefined,
    isLoading: !data && !settled,
    error: data ? undefined : error,
  };
};
