import { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";
import { httpClient } from "../../../../core";
import { Environment } from "../../../../config/environment";
import { convertSecondsToMinutes, parseDatePHP } from "../../services";
import { SongCard } from "../atomics";
import { MetaSong } from "../../../../models";

let songCache: MetaSong[] = [];
export const SongHistory = () => {
  const [songHistory, setSongHistory] = useState<MetaSong[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getHistory = async () => {
    setIsLoading(true);
    const endDate = parseDatePHP(new Date(Date.now()));
    const startDate = parseDatePHP(new Date(Date.now() - 3_600_000));

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
      songCache = data;
      setIsLoading(false);
    } catch (error) {}
  };

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
