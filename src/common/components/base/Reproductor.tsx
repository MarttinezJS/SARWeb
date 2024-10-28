import { Button, Card, CardBody, Image, Spacer } from "@nextui-org/react";
import { useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { FaMusic, FaPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { SlArrowRight } from "react-icons/sl";
import { PlayerProgress } from "../atomics";

export const Reproductor = () => {
  const player = useRef<ReactAudioPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(true);

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
                  setPlaying(!playing);
                  if (playing) {
                    player.current?.audioEl.current?.pause();
                  } else {
                    player.current?.audioEl.current?.play();
                    setExpanded(false);
                  }
                }}
              >
                <div className="text-7xl m-5 flex justify-center items-center">
                  {playing ? <FaCirclePause /> : <FaPlayCircle />}
                </div>
              </Button>
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex">
                <Image
                  alt="Album cover"
                  className="object-cover"
                  height={100}
                  shadow="md"
                  src={"/logo.svg"}
                />
                <Spacer />
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-0">
                    {/* <h3 className="font-semibold text-foreground/90">
                      Daily Mix
                    </h3>
                    <p className="text-small text-foreground/80">12 Tracks</p> */}
                    <h1 className="text-large font-medium mt-2 w-max">
                      Sigue adelante radio
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
