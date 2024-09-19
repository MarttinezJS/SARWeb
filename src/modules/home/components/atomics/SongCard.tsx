import {
  Button,
  Card,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spacer,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Song } from "../../models";
import { IoMdListBox } from "react-icons/io";

interface SongCardProps {
  song: Song;
  duration: string;
}

export const SongCard = ({ song, duration }: SongCardProps) => {
  const { onOpen, onOpenChange, isOpen } = useDisclosure();
  return (
    <div className="p-1">
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>
                <p>{song.title}</p>
              </ModalHeader>
              <ModalBody>
                <pre className="font-sans text-center">{song.lyrics}</pre>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Card fullWidth shadow="none" className="bg-yellow-background">
        <div className="flex justify-between">
          <div className="flex">
            <Image
              alt={`Canción número ${song.id}`}
              height={40}
              width={40}
              radius="sm"
              src={song.art}
            />
            <Spacer />
            <div className="flex flex-col">
              <p className=" font-bold text-secondary ">{song.title}</p>
              <p className="text-small text-default-500">{duration}</p>
            </div>
          </div>
          {song.lyrics && (
            <Tooltip content="Letra.">
              <Button
                onPress={onOpen}
                isIconOnly
                variant="light"
                color="primary"
              >
                <IoMdListBox className="text-secondary" />
              </Button>
            </Tooltip>
          )}
        </div>
      </Card>
    </div>
  );
};
