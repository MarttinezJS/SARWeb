import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useImageModalStore } from "../../hooks/useImageModalStore";
import { FileUploadZone, getClodinaryUrl } from "../../../../common";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export const ImageModal = () => {
  const [image, setImage] = useState<File>();
  const { closeModal, partner, visible } = useImageModalStore();
  const uploadImage = () => {};

  return (
    <Modal onClose={closeModal} isOpen={visible}>
      <ModalContent>
        {() => (
          <>
            <ModalBody>
              <FileUploadZone
                onChangeFile={setImage}
                config={{ image: "*" }}
                text="Seleccione el logo"
                defaultImageUrl={getClodinaryUrl(partner?.imageUrl)}
              />
              <Button
                color="primary"
                isDisabled={!image}
                endContent={<FaCloudUploadAlt />}
              >
                <p className="font-bold">Subir</p>
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
