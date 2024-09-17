import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { useResponseModalStore } from "../../hooks";
import { CiWarning } from "react-icons/ci";
import { VscError } from "react-icons/vsc";

export const ResponseModal = () => {
  const { visible, resp, closeModal } = useResponseModalStore();
  return resp ? (
    <Modal
      backdrop="blur"
      onClose={closeModal}
      placement="center"
      isOpen={visible}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="pb-0 justify-center">
              <div
                className={`text-6xl text-${resp.error ? "error" : "warning"}`}
              >
                {resp.error ? <VscError /> : <CiWarning />}
              </div>
            </ModalHeader>
            <ModalHeader className="pt-0 justify-center">
              <p>{resp.message}</p>
            </ModalHeader>
          </>
        )}
      </ModalContent>
    </Modal>
  ) : (
    <></>
  );
};
