import { Button, Card, CardBody } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { FaMusic, FaPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { SlArrowRight } from "react-icons/sl";
import { ProgressComponent, SongData } from "../atomics";
import { httpClient } from "../../../core";
import { Environment } from "../../../config/environment";
import { AzuraResp } from "../../../models";
import { useAzuraStore } from "../../../hooks";

export const Reproductor = () => {
  const player = useRef<ReactAudioPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const { data, setData } = useAzuraStore();
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
      setData(data);
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
              <SongData
                streamer={data?.live}
                playing={data?.now_playing}
                isLoading={isLoading}
              />
              <ProgressComponent player={player} />
              <div className="flex w-full items-center justify-center"></div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
