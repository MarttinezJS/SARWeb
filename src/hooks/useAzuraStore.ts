import { create } from "zustand";
import type { NowPlaying } from "../models";

/**
 * Estado de la conexión en tiempo real ("now playing"):
 * - connecting: primer intento, todavía no se sabe.
 * - open: conectado.
 * - down: lleva un rato sin poder conectar (se sigue reintentando).
 */
export type WsStatus = "connecting" | "open" | "down";

interface AzuraStoreProps {
  data: NowPlaying | undefined;
  setData: (data: NowPlaying) => void;
  wsStatus: WsStatus;
  setWsStatus: (status: WsStatus) => void;
  /** Error al consultar AzuraCast (vía API) o al cargar el audio; undefined si va bien. */
  azuraError: string | undefined;
  setAzuraError: (error: string | undefined) => void;
  /** Error del reproductor de audio (stream de AzuraCast). */
  streamError: string | undefined;
  setStreamError: (error: string | undefined) => void;
}

export const useAzuraStore = create<AzuraStoreProps>((set) => ({
  data: undefined,
  // Un dato nuevo prueba que AzuraCast responde: se limpia el error.
  setData: (data) => set({ data, azuraError: undefined }),
  wsStatus: "connecting",
  setWsStatus: (wsStatus) => set({ wsStatus }),
  azuraError: undefined,
  setAzuraError: (azuraError) => set({ azuraError }),
  streamError: undefined,
  setStreamError: (streamError) => set({ streamError }),
}));
