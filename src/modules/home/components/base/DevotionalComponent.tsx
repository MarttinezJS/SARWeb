import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CircularProgress,
  useDisclosure,
} from "@heroui/react";
import { FaWhatsapp } from "react-icons/fa";
import { DevotionalModal } from "../modals";
import { useEffect, useState } from "react";
import { Devotional } from "../../models";
import { formatDate, get } from "../../../../common";
import { Endpoints } from "../../config/endpoints";

export const DevotionalComponent = () => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [devotional, setDevotional] = useState<Devotional>();
  useEffect(() => {
    setIsLoading(true);
    get<Devotional>(Endpoints.LAST_DEVOTIONAL).then((resp) => {
      setDevotional(resp.body);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="grid justify-items-center pt-2">
      <DevotionalModal
        imageUrl={devotional?.imageUrl}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <div className="p-5 w-full">
        <Card
          isFooterBlurred
          shadow="none"
          className="bg-yellow-background w-full"
        >
          <CardHeader>
            <p className="font-bold text-2xl text-secondary">
              Adelante familia de la fe
            </p>
          </CardHeader>
          <CardFooter className="bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
              {!isLoading ? (
                <p className="text-black text-tiny">
                  {formatDate(devotional?.createdDate)}
                </p>
              ) : (
                <CircularProgress />
              )}
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
      <Button
        endContent={<FaWhatsapp />}
        variant="shadow"
        size="lg"
        isDisabled={isLoading}
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
