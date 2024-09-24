import {
  useDisclosure,
  Card,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Image,
} from "@nextui-org/react";
import { FaHandPointer } from "react-icons/fa";
import { save, CustomForm, InputForm } from "../../../../common";
import { Endpoints } from "../../config/endpoints";
import { RegisterPartnerFields } from "../../models";
import { useResponseModalStore } from "../../../../hooks";

export const SubsBanner = () => {
  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();
  const showResp = useResponseModalStore((s) => s.showModal);
  const onSubmit = async (formData: RegisterPartnerFields) => {
    const resp = await save(Endpoints.PARTNERS, formData);
    showResp(resp);
    if (resp.error == false) {
      onClose();
    }
    return resp;
  };
  return (
    <div className="w-full flex justify-center">
      <Card
        shadow="none"
        onPress={() => onOpen()}
        isPressable
        className="bg-yellow-background"
      >
        <div className="flex m-2 items-center justify-between">
          <p className="font-serif">Mas información</p>
          <FaHandPointer className="text-secondary" />
        </div>
        <Image src={"/plan-70.jpeg"} height={300} />
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="justify-center">
                <p className="text-secondary text-3xl">Únete</p>
              </ModalHeader>
              <ModalBody>
                <CustomForm<RegisterPartnerFields> onSubmit={onSubmit}>
                  {(register) => (
                    <div>
                      <InputForm
                        registerReturn={register("companyName", {
                          required: "Nombre obligatorio.",
                        })}
                        label="Nombre de la empresa"
                      />
                      <InputForm
                        registerReturn={register("nit", {
                          required: "Campo obligatorio.",
                          maxLength: {
                            value: 10,
                            message: "Debe ser de 10 dígitos máximo",
                          },
                        })}
                        label="NIT o CC"
                      />
                      <InputForm
                        registerReturn={register("contact", {
                          required: "Se necesita el nombre del representante.",
                        })}
                        label="Nombre del representante"
                      />
                      <InputForm
                        registerReturn={register("contactNumber", {
                          required:
                            "Se necesita el teléfono del representante.",
                          maxLength: {
                            value: 10,
                            message: "Debe ser máximo de 10 dígitos",
                          },
                          minLength: {
                            value: 8,
                            message: "Debe contener al menos 8 dígitos",
                          },
                        })}
                        label="Teléfono del representante"
                      />
                      <InputForm
                        registerReturn={register("email", {
                          required: "Se necesita el correo de contacto.",
                          pattern: {
                            value: new RegExp(
                              "[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}"
                            ),
                            message: "No es un email válido",
                          },
                        })}
                        label="Correo del representante"
                      />
                    </div>
                  )}
                </CustomForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
