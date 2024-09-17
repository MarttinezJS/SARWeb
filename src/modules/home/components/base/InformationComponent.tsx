import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

export const InformationComponent = () => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  return (
    <div className="grid items-center h-full justify-center p-1">
      <Button color="secondary" onPress={onOpen}>
        Volver a escuchar
      </Button>
      <div className="text-center font-serif">
        <p className="text-3xl ">Sigue adelante radio</p>
        <p>Carrera 23 # 6d - 22</p>
        <p>Valledupar - Cesar</p>
        <p>Colombia</p>
      </div>
      <Modal
        scrollBehavior="outside"
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <ModalBody>
              <iframe
                src="https://stream.sigueadelanteradio.com/public/milanesa/embed-requests"
                id="request-songs"
                title="Solicitud de canciones"
                allow="fullscreen"
                height={950}
              ></iframe>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
