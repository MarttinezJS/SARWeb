import { RefObject, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { SongData, VolumeIcon } from "../atomics";
import { Button } from "@heroui/button";
import { IoIosArrowUp, IoIosPause, IoIosPlay } from "react-icons/io";
import { Slider } from "@heroui/slider";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";

interface PlayerProps {
  ref: RefObject<ReactAudioPlayer | null>;
  onChangeVolume: (value: number) => void;
  volume: number;
}

export const Player = ({ ref, onChangeVolume, volume }: PlayerProps) => {
  const player = ref.current;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={clsx(
        "fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl z-50 transition-transform duration-300",
        collapsed ? "translate-y-24" : "translate-y-0",
      )}
    >
      <AnimatePresence>
        {collapsed && (
          <motion.div
            className="absolute left-1/2 -top-10 -translate-x-1/2 z-10"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
          >
            <Button
              isIconOnly
              radius="full"
              size="sm"
              variant="shadow"
              color="primary"
              onPress={() => setCollapsed(false)}
            >
              <IoIosArrowUp />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white/10 dark:bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full p-2.5 shadow-2xl">
        <div className="flex items-center w-full">
          <div className="flex items-center gap-3 w-full sm:w-1/3 min-w-0">
            <SongData isPlaying={isPlaying} />
          </div>
          <div className="ml-auto sm:ml-0 sm:flex sm:justify-center sm:w-1/3">
            <Button
              variant="shadow"
              color="primary"
              radius="full"
              isLoading={isLoading}
              onPress={async () => {
                setIsLoading(true);
                if (isPlaying) {
                  await player?.audioEl.current.pause();
                } else {
                  await player?.audioEl.current.play();
                }
                setIsLoading(false);
                setIsPlaying(!isPlaying);
                setCollapsed(!isPlaying);
              }}
              isIconOnly
            >
              {isPlaying ? <IoIosPause /> : <IoIosPlay size={20} />}
            </Button>
          </div>
          <div className="hidden sm:flex justify-end w-1/3">
            <div className="w-32">
              <Slider
                aria-label="Volumen"
                size="sm"
                defaultValue={volume}
                minValue={0}
                startContent={<VolumeIcon volume={volume} />}
                onChange={(value) => onChangeVolume(value as number)}
                maxValue={1}
                step={0.01}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
