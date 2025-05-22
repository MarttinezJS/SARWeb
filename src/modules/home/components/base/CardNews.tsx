import {
  Card,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Tooltip,
} from "@heroui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getClodinaryUrl } from "../../../../common";
import { New } from "../../models";
import { FaHandPointer } from "react-icons/fa";
import { useNewsModalStore } from "../../hooks";
interface CardNewsProps {
  new: New;
}
export const CardNews = ({ new: news }: CardNewsProps) => {
  const showNew = useNewsModalStore((s) => s.showModal);
  return (
    <Tooltip placement="right" content={news.abstract}>
      <Card
        isPressable
        onPress={() => showNew(news)}
        className="max-w-[400px] justify-center flex xl:my-10 bg-yellow-background"
      >
        <CardHeader className="justify-center">
          <p className="text-md">{news.title}</p>
        </CardHeader>
        <Divider />
        <div className="flex m-2 justify-center">
          <Image
            alt="Card background"
            className="object-cover rounded-xl max-xl:size-32"
            src={getClodinaryUrl(news.imageUrl)}
            width={270}
          />
        </div>
        <CardFooter>
          <div className="flex justify-between w-full items-center">
            <p>Mas información</p>
            <FaHandPointer className="text-secondary" />
          </div>
        </CardFooter>
      </Card>
    </Tooltip>
  );
};
