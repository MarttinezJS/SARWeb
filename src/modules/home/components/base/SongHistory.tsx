import { useEffect, useState } from "react";
import { AzuraSong, AzuraWebhook } from "../../models";
import { CircularProgress } from "@nextui-org/react";
import { httpClient } from "../../../../core";
import { Environment } from "../../../../config/environment";
import { convertSecondsToMinutes, parseDatePHP } from "../../services";
import { SongCard } from "../atomics";

let songCache: AzuraSong[] = [];
export const SongHistory = () => {
  const [songHistory, setSongHistory] = useState<AzuraSong[]>([]);
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
    const socket = new WebSocket(Environment.VITE_WS_URL);
    socket.onopen = () => {
      console.log("Websocket connected");
    };
    socket.onmessage = (event: MessageEvent<string>) => {
      const data = JSON.parse(event.data) as AzuraWebhook;
      setSongHistory([data.now_playing, ...songCache]);
      songCache.unshift(data.now_playing);
    };
    socket.onclose = () => {
      console.log("Websocket disconnected");
    };

    return () => {
      socket.close();
    };
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
