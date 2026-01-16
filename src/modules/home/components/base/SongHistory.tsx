import { useCallback, useEffect, useState } from "react";
import { formatDuration, get } from "../../../../common";
import { MetaSong } from "../../../../models";
import { addToast } from "@heroui/toast";
import { Skeleton } from "@heroui/skeleton";

export const SongHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<MetaSong[]>([]);
  const getHistory = useCallback(async () => {
    const resp = await get<MetaSong[]>(`/azura/history`);
    if (resp.error) {
      addToast({
        title: resp.message,
        color: "danger",
      });
      return [];
    }
    return resp.body ?? [];
  }, []);
  useEffect(() => {
    getHistory().then((resp) => {
      setIsLoading(false);
      setData(resp);
    });
  }, [getHistory]);

  return (
    <section className="glass-panel rounded-2xl max-h-1/4 overflow-x-hidden overflow-y-scroll">
      <div>
        {isLoading &&
          [1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="max-w-75 w-full py-2 flex items-center gap-3"
            >
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
          ))}
        {data.map((track, idx) => (
          <div
            key={idx}
            className="flex py-1 items-center gap-4 transition-colors cursor-pointer"
          >
            <div className="relative w-12 h-12 rounded overflow-hidden flex items-center justify-center text-xs font-bold text-white">
              <img
                src={track.song.art}
                alt={track.song.title}
                className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-110"
              />

              <div className="absolute inset-0 bg-black/40" />

              <span className="relative z-10">
                {formatDuration(track.duration)}
              </span>
            </div>

            <div className="grow min-w-0">
              <p className="text-sm font-bold truncate">{track.song.title}</p>
              <p className="text-xs truncate">{track.song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
