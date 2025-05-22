import { Image, Modal, ModalBody, ModalContent } from "@heroui/react";
import { Environment } from "../../../../config/environment";

interface DevotionalModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  imageUrl: string | undefined;
}

export const DevotionalModal = ({
  isOpen,
  onOpenChange,
  imageUrl,
}: DevotionalModalProps) => {
  return (
    <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <ModalBody>
            {imageUrl && (
              <Image
                src={`https://res.cloudinary.com/${Environment.VITE_CLOUD_NAME}/image/upload/v1724733305/${imageUrl}`}
              />
            )}
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};
