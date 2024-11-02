import { RefObject, useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { PlayerProgress } from "./PlayerProgress";
import { get } from "../../services";
import { Endpoints } from "../../endpoints";
import { Points } from "../../../models";
import { useResponseModalStore } from "../../../hooks";
import { CircularProgress, Select, SelectItem } from "@nextui-org/react";

interface ProgressComponentProps {
  player: RefObject<ReactAudioPlayer>;
}
export const ProgressComponent = ({ player }: ProgressComponentProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [points, setPoints] = useState<Points[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<Points>();
  const showResp = useResponseModalStore((s) => s.showModal);
  const getPoints = async () => {
    setIsLoading(true);
    const resp = await get<Points[]>(`${Endpoints.POINTS}`);
    if (resp.error || !resp.body) {
      showResp(resp);
      return;
    }
    setPoints(resp.body);
    setSelectedPoint(resp.body[0]);
    setIsLoading(false);
  };
  useEffect(() => {
    getPoints();
  }, []);

  return selectedPoint && !isLoading ? (
    <div>
      <PlayerProgress player={player.current?.audioEl.current} />
      <ReactAudioPlayer src={selectedPoint.url} ref={player} />
      <Select
        variant="underlined"
        items={points}
        size="sm"
        disallowEmptySelection
        classNames={{
          popoverContent: "bg-yellow-background",
        }}
        color="primary"
        defaultSelectedKeys={"1"}
      >
        {(point) => <SelectItem key={point.id}>{point.name}</SelectItem>}
      </Select>
    </div>
  ) : (
    <div className="p-2">
      <CircularProgress />
    </div>
  );
};
