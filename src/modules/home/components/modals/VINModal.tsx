import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useVINModalStore } from "../../hooks";
import { EmbedPost } from "../atomics";
export const VINModal = () => {
  const { visible, closeModal } = useVINModalStore();
  return (
    <Modal
      closeButton
      backdrop="blur"
      placement="center"
      aria-labelledby="modal-title"
      isOpen={visible}
      hideCloseButton
      onClose={closeModal}
    >
      <ModalContent>
        <EmbedPost close={closeModal} />
      </ModalContent>
    </Modal>
  );
};
