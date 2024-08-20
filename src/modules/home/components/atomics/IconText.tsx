import { Spacer } from "@nextui-org/react";
import { PiArrowRightBold } from "react-icons/pi";

interface IconTextProps {
  icon: JSX.Element;
  text: string;
}

export const IconText = ({ icon, text }: IconTextProps) => {
  return (
    <div className=" justify-between flex items-center">
      <div className="flex items-center lg:text-xl xl:text-2xl text-secondary">
        {icon}
        <Spacer />
        {text}
      </div>
      <PiArrowRightBold className="text-secondary" />
    </div>
  );
};
