import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { authProvider } from "../../../../core";
import { useResponseModalStore } from "../../../../hooks";
import { CustomForm, InputForm } from "../../../../common";
import { LoginFields } from "../../models";
import { useNavigate } from "react-router-dom";
interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export const LoginModal = ({ isOpen, onOpenChange }: LoginModalProps) => {
  const showResp = useResponseModalStore((s) => s.showModal);
  const navigate = useNavigate();
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
                onSubmit={async ({ username, password }) => {
                  const { pass, resp } = await authProvider.login(
                    username,
                    password
                  );
                  if (!pass) {
                    showResp(resp);
                  } else {
                    onClose;
                    navigate("/user");
                  }
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
