import { Modal, ModalContent, ModalHeader } from "@heroui/react";
import { useResponseModalStore } from "../../../hooks";
import { VscError } from "react-icons/vsc";
import { FaCheck } from "react-icons/fa6";

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
                className={`text-6xl text-${resp.error ? "error" : "success"}`}
              >
                {resp.error ? <VscError /> : <FaCheck />}
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
