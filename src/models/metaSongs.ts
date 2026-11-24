export interface MetaSong {
  sh_id: number;
  played_at: number;
  duration: number;
  playlist: string;
  streamer: string;
  is_request: boolean;
  song: Song;
  elapsed: number;
  remaining: number;
}

export interface Song {
  id: string;
  art: string;
  // Lista vacía si la estación no tiene campos personalizados; si los tiene,
  // AzuraCast devuelve un objeto { nombre_programatico: valor }.
  custom_fields: Record<string, string | null> | [];
  text: string;
  artist: string;
  title: string;
  album: string;
  genre: string;
  isrc: string;
  lyrics: string;
}

/** Elemento de GET /azura/history. */
export interface HistoryItem {
  sh_id: number;
  /** Fecha ISO en la que sonó. */
  playedAt: string;
  duration: number;
  song: Song;
}

export interface NowPlaying {
  live: Live;
  now_playing: MetaSong;
}

export interface Live {
  art: string | null;
  is_live: boolean;
  streamer_name: string;
}
