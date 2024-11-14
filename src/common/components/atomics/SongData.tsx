import { Skeleton, Spacer, Chip, Image } from "@nextui-org/react";
import { RiSignalTowerFill } from "react-icons/ri";
import { Live, MetaSong } from "../../../models";

interface SongDataProps {
  streamer: Live | undefined;
  playing: MetaSong | undefined;
  isLoading: boolean;
}

export const SongData = ({ isLoading, playing, streamer }: SongDataProps) => {
  return (
    <div className="flex">
      {isLoading ? (
        <Skeleton className="flex rounded-3xl w-24 h-24" />
      ) : (
        <Image
          alt="Album cover"
          className="object-cover hidden sm:flex"
          height={100}
          shadow="md"
          src={
            streamer?.is_live ? streamer?.art ?? "/logo.svg" : playing?.song.art
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
                streamer?.is_live
                  ? streamer?.streamer_name
                  : playing?.song.artist
              }`
            )}
          </h3>
          {isLoading ? (
            <Skeleton className="flex rounded-lg w-15 h-6" />
          ) : (
            <p className="text-small text-foreground/80">
              {streamer?.is_live
                ? `Desde las ${new Date(
                    streamer?.broadcast_start ?? Date.now()
                  ).toLocaleTimeString()}`
                : playing?.song.album}
            </p>
          )}
          <h1
            className={`text-large ${
              streamer?.is_live && "text-red-500"
            } font-medium mt-2 w-max`}
          >
            {isLoading ? (
              <Skeleton className="flex rounded-lg w-52 h-6" />
            ) : streamer?.is_live ? (
              <div className="flex">
                <Chip startContent={<RiSignalTowerFill />} color="danger">
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
  );
};
