import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { MdGraphicEq } from "react-icons/md";
import { Endpoints, formatTime, ImageWithFallback } from "../../../common";
import { useApi, useNowPlaying } from "../../../hooks";
import type { HistoryItem } from "../../../models";

const HISTORY_SIZE = 6;

/** "Ahora suena" + historial reciente de AzuraCast. */
export const NowPlayingCard = () => {
  const { data, title, subtitle, art, isLive, isLoading, error } = useNowPlaying();
  // El historial se vuelve a pedir cada vez que cambia la canción.
  const songId = data?.now_playing?.song?.id ?? "";
  const history = useApi<HistoryItem[]>(Endpoints.HISTORY, songId);
  const album = isLive ? undefined : data?.now_playing?.song?.album;
  const tracks = (history.data ?? []).slice(0, HISTORY_SIZE);

  return (
    <section
      aria-labelledby="ahora-suena"
      className="overflow-hidden rounded-2xl bg-secondary text-secondary-foreground shadow-lg"
    >
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2
            id="ahora-suena"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary"
          >
            <MdGraphicEq aria-hidden="true" className="text-lg" /> Ahora suena
          </h2>
          {isLive && (
            <Chip size="sm" color="danger" className="font-bold uppercase">
              En vivo
            </Chip>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center gap-4">
            <Skeleton className="h-24 w-24 shrink-0 rounded-xl" />
            <div className="w-full space-y-2">
              <Skeleton className="h-5 w-4/5 rounded-lg" />
              <Skeleton className="h-4 w-1/2 rounded-lg" />
            </div>
          </div>
        ) : error ? (
          <p role="alert" className="text-sm text-secondary-foreground/80">
            No pudimos consultar qué está sonando. La radio sigue disponible en el
            reproductor.
          </p>
        ) : (
          <div className="flex items-center gap-4" aria-live="polite">
            <ImageWithFallback
              src={art}
              alt=""
              className="h-24 w-24 shrink-0 rounded-xl object-cover shadow-md"
            />
            <div className="min-w-0">
              <p className="title line-clamp-2 text-xl font-bold leading-tight">{title}</p>
              <p className="truncate text-sm text-primary-300">{subtitle}</p>
              {album && (
                <p className="truncate text-xs text-secondary-foreground/70">{album}</p>
              )}
            </div>
          </div>
        )}
        <p className="mt-4 text-xs text-secondary-foreground/70">
          Escúchala en vivo con el reproductor de la parte inferior.
        </p>
      </div>

      <div className="bg-black/20 p-5">
        <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
          Sonó hace poco
        </h3>
        {history.isLoading && tracks.length === 0 ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
                <div className="w-full space-y-2">
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-2/5 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : history.error ? (
          <p role="alert" className="text-sm text-secondary-foreground/80">
            No se pudo cargar el historial.{" "}
            <button type="button" className="font-semibold underline" onClick={history.reload}>
              Reintentar
            </button>
          </p>
        ) : tracks.length === 0 ? (
          <p className="text-sm text-secondary-foreground/80">Aún no hay canciones en el historial.</p>
        ) : (
          <ol className="space-y-3">
            {tracks.map((track) => (
              <li key={track.sh_id} className="flex items-center gap-3">
                <ImageWithFallback
                  src={track.song.art}
                  alt=""
                  className="h-10 w-10 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 grow">
                  <p className="truncate text-sm font-semibold">{track.song.title}</p>
                  <p className="truncate text-xs text-secondary-foreground/70">
                    {track.song.artist}
                  </p>
                </div>
                <time
                  dateTime={track.playedAt}
                  className="shrink-0 text-xs tabular-nums text-secondary-foreground/70"
                >
                  {formatTime(track.playedAt)}
                </time>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
};
