import { Skeleton } from "@heroui/skeleton";
import { useNowPlaying } from "../../../hooks";
import { ImageWithFallback } from "./ImageWithFallback";

interface SongDataProps {
  isPlaying?: boolean;
}

/** Carátula, título y artista de lo que suena (dentro del reproductor). */
export const SongData = ({ isPlaying = false }: SongDataProps) => {
  const { title, subtitle, art, isLive, isLoading } = useNowPlaying();
  return (
    <div className="flex w-full items-center gap-3 px-1">
      <div
        className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-full shadow-lg ${
          isPlaying ? "rotating-disk" : ""
        }`}
      >
        <ImageWithFallback src={art} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="h-2 w-2 rounded-full bg-white" />
        </div>
      </div>
      <div className="min-w-0 flex-1" aria-live="polite">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-3 w-4/5 rounded-lg" />
            <Skeleton className="h-3 w-1/2 rounded-lg" />
          </div>
        ) : (
          <>
            <p className="w-full truncate text-sm font-bold">
              {title ?? "Sigue Adelante Radio"}
            </p>
            <div className="flex items-center gap-2">
              {isLive && (
                <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-danger-400" />
              )}
              <p className="truncate text-xs font-medium text-primary-300">
                {subtitle ?? "Radio en línea"}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
