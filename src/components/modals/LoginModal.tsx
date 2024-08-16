import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { CustomForm, InputForm } from "../../common";
import type { LoginFields } from "../../models";
interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export const LoginModal = ({ isOpen, onOpenChange }: LoginModalProps) => {
  return (
    <Modal
      placement="top-center"
      size="sm"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Iniciar sesión
            </ModalHeader>
            <ModalBody>
              <CustomForm<LoginFields>
                onSubmit={async (data) => {
                  console.log(data);
                }}
              >
                {(register) => (
                  <div>
                    <InputForm
                      label="Usuario"
                      registerReturn={{
                        ...register("username", {
                          required: "Campo obligatorio",
                        }),
                      }}
                    />
                    <InputForm
                      label="Contraseña"
                      type="password"
                      registerReturn={{
                        ...register("password", {
                          required: "Campo obligatorio",
                        }),
                      }}
                    />
                  </div>
                )}
              </CustomForm>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
