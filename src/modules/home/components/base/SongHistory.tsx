import { useEffect, useState } from "react";
import { CircularProgress } from "@heroui/react";
import { httpClient } from "../../../../core";
import { Environment } from "../../../../config/environment";
import { convertSecondsToMinutes } from "../../services";
import { SongCard } from "../atomics";
import { MetaSong } from "../../../../models";
import { useAzuraStore } from "../../../../hooks";

export const SongHistory = () => {
  const [songHistory, setSongHistory] = useState<MetaSong[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const data = useAzuraStore((s) => s.data);

  const getHistory = async () => {
    setIsLoading(true);
    const endDate = new Date(Date.now()).toISOString();
    const startDate = new Date(Date.now() - 3_600_000).toISOString();
    try {
      const { data } = await httpClient.get(
        `station/${Environment.VITE_STATION_ID}/history?start=${startDate}&end=${endDate}`,
        {
          baseURL: Environment.VITE_AZURA_API_URL,
          headers: {
            "X-API-Key": Environment.VITE_AZURA_API_KEY,
          },
        }
      );
      setSongHistory(data);
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (data && !data.live.is_live) {
      setSongHistory([data.now_playing, ...songHistory]);
    }
  }, [data]);

  useEffect(() => {
    getHistory();
  }, []);

  return isLoading ? (
    <div className="flex w-full justify-center">
      <CircularProgress />
    </div>
  ) : (
    <div className="h-full overflow-scroll w-full">
      {songHistory.map((history) => (
        <SongCard
          key={history.sh_id}
          song={history.song}
          duration={convertSecondsToMinutes(history.duration)}
        />
      ))}
    </div>
  );
};
