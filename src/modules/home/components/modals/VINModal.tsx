import { Button, Modal, ModalBody, ModalContent } from "@heroui/react";
import { useVINModalStore } from "../../hooks";
import { FaTimes } from "react-icons/fa";
export const VINModal = () => {
  const { visible, closeModal } = useVINModalStore();
  return (
    <Modal
      closeButton
      backdrop="blur"
      size="4xl"
      placement="center"
      aria-labelledby="modal-title"
      isOpen={visible}
      onClose={closeModal}
      hideCloseButton
    >
      <ModalContent>
        {() => (
          <ModalBody className="p-0">
            <Button
              className="absolute m-2"
              color="danger"
              onPress={closeModal}
              isIconOnly
            >
              <FaTimes />
            </Button>
            <iframe
              src="https://widget.taggbox.com/2140074"
              className="h-[700px] sm:h-screen "
              loading="lazy"
            />
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};
