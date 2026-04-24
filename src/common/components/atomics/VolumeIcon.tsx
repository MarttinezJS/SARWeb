import {
  IoVolumeMute,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeHigh,
} from "react-icons/io5";

interface VolumeIconProps {
  volume: number;
}
export const VolumeIcon = ({ volume }: VolumeIconProps) => {
  return volume == 0 ? (
    <IoVolumeMute />
  ) : volume < 0.3 ? (
    <IoVolumeLow />
  ) : volume < 0.7 ? (
    <IoVolumeMedium />
  ) : (
    <IoVolumeHigh />
  );
};
