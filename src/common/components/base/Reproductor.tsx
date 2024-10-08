import { Button, Card, CardBody, Image, Slider } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { FaMusic } from "react-icons/fa";
import { FaPause, FaPlay, FaRepeat, FaShuffle } from "react-icons/fa6";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { RiArrowRightSLine } from "react-icons/ri";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { PlayerProgress } from "../atomics";

export const Reproductor = () => {
  const player = useRef<ReactAudioPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(true);
  // return (
  //   <iframe
  //     src="http://192.168.1.81:3000/public/milanesa/embed"
  //     allowTransparency={false}
  //     allow="autoplay"
  //     style={{
  //       width: "100%",
  //       border: "0",
  //     }}
  //   ></iframe>
  // );
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
        className={`absolute z-10 top-1/2 ${
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
        className=" max-w-[610px] border-none bg-background/60 dark:bg-default-100/50"
        shadow="sm"
        fullWidth
      >
        <CardBody>
          <div className="grid grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="Album cover"
                className="object-cover"
                height={200}
                shadow="md"
                src={"/logo.svg"}
              />
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  {/* <h3 className="font-semibold text-foreground/90">
                    Daily Mix
                  </h3>
                  <p className="text-small text-foreground/80">12 Tracks</p> */}
                  <h1 className="text-large font-medium mt-2">
                    Sigue adelante radio
                  </h1>
                </div>
                {/* <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button> */}
              </div>
              <PlayerProgress player={player.current?.audioEl.current} />
              <ReactAudioPlayer
                src="https://server2.ejeserver.com:8826/stream"
                ref={player}
              />
              <div className="flex w-full items-center justify-center">
                <Button
                  isIconOnly
                  radius="full"
                  size="lg"
                  variant="light"
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
                  {playing ? <FaPause /> : <FaPlay />}
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
