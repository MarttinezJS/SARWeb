import { Modal, ModalContent } from "@nextui-org/react";

interface DevotionalModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const DevotionalModal = ({
  isOpen,
  onOpenChange,
}: DevotionalModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>{() => <>a</>}</ModalContent>
    </Modal>
  );
};
