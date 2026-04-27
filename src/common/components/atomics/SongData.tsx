import { addToast } from "@heroui/toast";
import { useCallback, useEffect, useState } from "react";
import { Live, MetaSong } from "../../../models";
import { get } from "../../services";
import { useAzuraStore } from "../../../hooks";
import { Skeleton } from "@heroui/skeleton";
interface SongDataProps {
  isPlaying?: boolean;
}

export const SongData = ({ isPlaying = false }: SongDataProps) => {
  const { data, setData } = useAzuraStore();
  const [isLoading, setIsLoading] = useState(false);
  const getNowPlaying = useCallback(async () => {
    try {
      const resp = await get<{ live: Live; now_playing: MetaSong }>(
        `/azura/now-playing`,
      );
      if (resp.error) {
        addToast({
          title: resp.message,
          color: "danger",
        });
        return;
      }
      setData(resp.body!);
    } catch (error: unknown) {
      addToast({
        title: "Error",
        description: (error as { message: string }).message,
      });
    }
  }, [setData]);
  useEffect(() => {
    getNowPlaying().then(() => {
      setIsLoading(false);
    });
  }, [getNowPlaying]);
  return (
    <div className="flex items-center gap-4 px-2 w-full">
      <div
        className={`relative w-12 h-12 rounded-full overflow-hidden shadow-lg ${
          isPlaying ? "rotating-disk" : ""
        }`}
      >
        <img
          src={data?.live.is_live ? data.live.art : data?.now_playing?.song.art}
          alt="img"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        {isLoading && <Skeleton className="h-3 w-full rounded-lg" />}
        <h4 className="text-sm font-bold truncate w-full">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur
          qui ea esse nemo inventore fugiat in natus quia recusandae distinctio
          eum reprehenderit ducimus nesciunt ab, modi magnam animi maxime!
          Aspernatur.
          {/* {data?.live.is_live
            ? data.live.streamer_name
            : data?.now_playing.song.title} */}
        </h4>
        <div className="flex items-center gap-2">
          {isLoading && <Skeleton className="h-3 w-1/2 rounded-lg mt-2" />}
          {data?.live?.is_live && (
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          )}
          <p className="text-xs text-brand-gold font-medium">
            {data?.live?.is_live
              ? "En Vivo Ahora"
              : data?.now_playing.song.artist}
          </p>
        </div>
      </div>
    </div>
  );
};
