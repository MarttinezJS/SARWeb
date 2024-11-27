import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useVINModalStore } from "../../hooks";
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
      classNames={{
        base: "bg-transparent",
      }}
      onClose={closeModal}
    >
      <ModalContent>
        {() => (
          <ModalBody className="p-0">
            <iframe
              src="https://widget.taggbox.com/2140074"
              className="h-[700px] sm:h-screen"
              loading="lazy"
            />
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};
