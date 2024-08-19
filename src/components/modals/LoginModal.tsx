import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { CustomForm, InputForm } from "../../common";
import type { LoginFields, Response } from "../../models";
import { Endpoints, httpClient } from "../../config";
import { useReloadMenuStore, useResponseModalStore } from "../../hooks";
import { save } from "../../common/services/save";
interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export const LoginModal = ({ isOpen, onOpenChange }: LoginModalProps) => {
  const reloadMenu = useReloadMenuStore((s) => s.reload);
  const showResp = useResponseModalStore((s) => s.showModal);
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
                onSubmit={async (formData) => {
                  const resp = await save<{ access_token: string }>(
                    Endpoints.LOGIN,
                    formData
                  );
                  console.log(resp);

                  if (resp.body && !resp.error) {
                    localStorage.setItem(
                      "access_token",
                      resp.body.access_token
                    );
                    reloadMenu();
                    onClose();
                  } else {
                    showResp(resp);
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
