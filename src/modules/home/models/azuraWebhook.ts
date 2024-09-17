export interface AzuraWebhook {
  now_playing: AzuraSong;
  playing_next: AzuraSong;
  song_history: AzuraSong[];
  is_online: boolean;
  cache: string;
}

export interface AzuraSong {
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
  custom_fields: [];
  text: string;
  artist: string;
  title: string;
  album: string;
  genre: string;
  isrc: string;
  lyrics: string;
}
