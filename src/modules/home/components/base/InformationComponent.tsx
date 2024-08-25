import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  useDisclosure,
} from "@nextui-org/react";
import { FaWhatsapp } from "react-icons/fa";
import { DevotionalModal } from "../modals";

export const InformationComponent = () => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  return (
    <div className="grid justify-items-center pt-2">
      <DevotionalModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="p-5 w-full">
        <Card
          isFooterBlurred
          shadow="none"
          className="bg-yellow-background w-full"
        >
          <CardHeader>
            <p className="font-bold text-2xl text-secondary">
              Devocional despertando con el maestro
            </p>
          </CardHeader>
          <CardBody>s</CardBody>
          <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
              <p className="text-black text-tiny">01/08/2024</p>
            </div>
            <Button
              className="text-tiny"
              color="primary"
              radius="full"
              size="sm"
              onPress={onOpen}
            >
              Ver
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Divider className="my-5" />
      <Button
        endContent={<FaWhatsapp />}
        variant="shadow"
        size="lg"
        className="bg-whatsapp-color text-white animate-bounce "
        onPress={() =>
          (window.location.href =
            "https://api.whatsapp.com/send?phone=3138715190&text=Me%20gustaría%20que%20oraran%20por:%20")
        }
      >
        Envíanos tu petición
      </Button>
    </div>
  );
};