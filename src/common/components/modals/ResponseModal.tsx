import { useResponseModalStore } from "../../../hooks";

export const ResponseModal = () => {
  const { resp } = useResponseModalStore();
  return resp ? (
    <></>
  ) : (
    // <Modal
    //   backdrop="blur"
    //   onClose={closeModal}
    //   placement="center"
    //   isOpen={visible}
    // >
    //   <ModalContent>
    //     {() => (
    //       <>
    //         <ModalHeader className="pb-0 justify-center">
    //           <div
    //             className={`text-6xl text-${resp.error ? "error" : "success"}`}
    //           >
    //             {resp.error ? <VscError /> : <FaCheck />}
    //           </div>
    //         </ModalHeader>
    //         <ModalHeader className="pt-0 justify-center">
    //           <p>{resp.message}</p>
    //         </ModalHeader>
    //       </>
    //     )}
    //   </ModalContent>
    // </Modal>
    <></>
  );
};
