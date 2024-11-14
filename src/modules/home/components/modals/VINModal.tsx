import { Image, Modal, ModalContent } from "@nextui-org/react";
import { useVINModalStore } from "../../hooks";

export const VINModal = () => {
  const { visible, closeModal } = useVINModalStore();
  return (
    <Modal
      closeButton
      backdrop="blur"
      size="3xl"
      placement="center"
      aria-labelledby="modal-title"
      isOpen={visible}
      onClose={closeModal}
    >
      <ModalContent>
        {() => <Image src="/Invitacion AC.jpeg" width={800} />}
      </ModalContent>
    </Modal>
  );
};
