import { Card, CardHeader, Divider, Image, Tooltip } from "@nextui-org/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getClodinaryUrl } from "../../../../common";
import { New } from "../../models";
interface CardNewsProps {
  new: New;
}
export const CardNews = ({
  new: { imageUrl, abstract, title },
}: CardNewsProps) => {
  return (
    <Tooltip placement="right" content={abstract}>
      <Card className="max-w-[400px] justify-center flex xl:my-10 bg-yellow-background">
        <CardHeader className="justify-center">
          <p className="text-md">{title}</p>
        </CardHeader>
        <Divider />
        <div className="flex m-2 justify-center">
          <Image
            alt="Card background"
            className="object-cover rounded-xl max-xl:size-32"
            src={getClodinaryUrl(imageUrl)}
            width={270}
          />
        </div>
      </Card>
    </Tooltip>
  );
};
