import { Slider } from "@heroui/react";
import { useEffect, useState } from "react";
import { convertSecondsToMinutes } from "../../../modules/home/services";

interface PlayerProgressProps {
  player: HTMLAudioElement | undefined | null;
}
export const PlayerProgress = ({ player }: PlayerProgressProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    if (player && player != null) {
      player.addEventListener("progress", (ev: any) => {
        setDuration(ev.target.duration);
        setCurrentTime(ev.target.currentTime);
      });
    }
  }, [player]);

  return (
    <div className="flex flex-col mt-3 gap-1">
      <Slider
        aria-label="Progreso de la canción"
        classNames={{
          track: "bg-default-500/30",
          thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
        }}
        color="foreground"
        value={duration == 0 ? 0 : (currentTime / duration) * 100}
        size="sm"
      />
      <div className="flex justify-between">
        <p className="text-small">
          {convertSecondsToMinutes(Math.ceil(currentTime))}
        </p>
        <p className="text-small text-foreground/50">
          {convertSecondsToMinutes(Math.ceil(duration))}
        </p>
      </div>
    </div>
  );
};
