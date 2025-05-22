import { getClodinaryUrl } from "../../../../common";
import { useNewsModalStore } from "../../hooks";
import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";

export const NewsModal = () => {
  const { closeModal, news, visible } = useNewsModalStore();
  return (
    <Modal
      className="bg-yellow-background"
      size="5xl"
      isOpen={visible}
      onClose={closeModal}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <p className="text-3xl">{news?.title}</p>
            </ModalHeader>
            <ModalBody>
              <div className="flex justify-center w-full">
                <Image src={getClodinaryUrl(news?.imageUrl)} />
              </div>
            </ModalBody>
            <ModalBody>
              <p className="whitespace-pre-wrap">{news?.text}</p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
