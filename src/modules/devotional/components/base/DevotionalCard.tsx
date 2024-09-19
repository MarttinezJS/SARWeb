import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { getClodinaryUrl } from "../../../../common";

interface DevotionalCardProps {
  imageUrl: string;
  uploadDate: string;
}
export const DevotionalCard = ({
  imageUrl,
  uploadDate,
}: DevotionalCardProps) => {
  return (
    <Card className="m-5">
      <CardBody className="p-0">
        <Image
          //   width={300}
          className="max-w-72"
          aria-label="Imagen del devocional"
          src={getClodinaryUrl(imageUrl)}
        />
      </CardBody>
      <CardFooter>
        <div className="flex justify-between w-full items-end">
          <p>{uploadDate}</p>
          <Button isIconOnly color="danger" aria-label="Eliminar devocional">
            <MdDelete />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
