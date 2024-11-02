import {
  Button,
  Card,
  CardBody,
  Chip,
  Image,
  Skeleton,
  Spacer,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { FaMusic, FaPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { SlArrowRight } from "react-icons/sl";
import { PlayerProgress } from "../atomics";
import { httpClient } from "../../../core";
import { Environment } from "../../../config/environment";
import { AzuraResp } from "../../../models";
import { useSongsStore, useStreamerStore } from "../../../hooks";
import { RiSignalTowerFill } from "react-icons/ri";

export const Reproductor = () => {
  const player = useRef<ReactAudioPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const { isLive, playing, setData } = useSongsStore();
  const { data: streamer, setData: setStreamer } = useStreamerStore();
  const getNowPlaying = async () => {
    setIsLoading(true);
    try {
      const { data } = await httpClient.get<AzuraResp>(
        `nowplaying/${Environment.VITE_STATION_ID}`,
        {
          baseURL: Environment.VITE_AZURA_API_URL,
          headers: {
            "X-API-Key": Environment.VITE_AZURA_API_KEY,
          },
        }
      );
      if (data.live.is_live) {
        setStreamer(data.live);
      }
      setData({
        isLive: data.live.is_live,
        next: data.playing_next,
        playing: data.now_playing,
      });
    } catch (error) {}
    setIsLoading(false);
  };
  useEffect(() => {
    getNowPlaying();
  }, []);

  return (
    <div
      className={`fixed z-20 bottom-2  ${
        !expanded && "translate-x-full"
      } right-0 mx-2 duration-300 ease-in-out`}
    >
      <Button
        radius="full"
        isIconOnly
        variant="solid"
        color="secondary"
        className={`absolute z-10 top-[4.5rem] ${
          expanded ? "-left-5" : "-left-10"
        } duration-300`}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        {expanded ? <SlArrowRight /> : <FaMusic />}
      </Button>
      <Card
        isBlurred
        className=" max-w-[650px] border-none bg-background/60 dark:bg-default-100/50"
        shadow="sm"
        fullWidth
      >
        <CardBody>
          <div className="grid grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="relative flex col-span-6 h-full w-auto md:col-span-4 items-center justify-center">
              <Button
                isIconOnly
                radius="full"
                variant="shadow"
                color="primary"
                className="w-max h-max"
                onPress={() => {
                  setIsPlaying(!isPlaying);
                  if (isPlaying) {
                    player.current?.audioEl.current?.pause();
                  } else {
                    player.current?.audioEl.current?.play();
                    setExpanded(false);
                  }
                }}
              >
                <div className="text-7xl m-5 flex justify-center items-center">
                  {isPlaying ? <FaCirclePause /> : <FaPlayCircle />}
                </div>
              </Button>
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex">
                {isLoading ? (
                  <Skeleton className="flex rounded-3xl w-24 h-24" />
                ) : (
                  <Image
                    alt="Album cover"
                    className="object-cover"
                    height={100}
                    shadow="md"
                    src={
                      isLive ? streamer?.art ?? "/logo.svg" : playing?.song.art
                    }
                  />
                )}
                <Spacer />
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-0">
                    <h3 className="font-semibold text-foreground/90">
                      {isLoading ? (
                        <Skeleton className="flex rounded-lg w-15 h-6" />
                      ) : (
                        `${
                          isLive
                            ? streamer?.streamer_name
                            : playing?.song.artist
                        }`
                      )}
                    </h3>
                    {isLoading ? (
                      <Skeleton className="flex rounded-lg w-15 h-6" />
                    ) : (
                      <p className="text-small text-foreground/80">
                        {isLive
                          ? `Desde las ${new Date(
                              streamer?.broadcast_start ?? Date.now()
                            ).toLocaleTimeString()}`
                          : playing?.song.album}
                      </p>
                    )}
                    <h1
                      className={`text-large ${
                        isLive && "text-red-500"
                      } font-medium mt-2 w-max`}
                    >
                      {isLoading ? (
                        <Skeleton className="flex rounded-lg w-52 h-6" />
                      ) : isLive ? (
                        <div className="flex">
                          <Chip
                            startContent={<RiSignalTowerFill />}
                            color="danger"
                          >
                            EN VIVO
                          </Chip>
                        </div>
                      ) : (
                        `${playing?.song.title}`
                      )}
                    </h1>
                  </div>
                </div>
              </div>
              <PlayerProgress player={player.current?.audioEl.current} />
              <ReactAudioPlayer
                src="https://server2.ejeserver.com:8826/stream"
                ref={player}
              />
              <div className="flex w-full items-center justify-center"></div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
