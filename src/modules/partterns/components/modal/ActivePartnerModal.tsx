import {
  CustomForm,
  FileUploadZone,
  InputForm,
  modify,
} from "../../../../common";
import { useActivePartnerModalStore } from "../../hooks";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { Partner } from "../../models";
import { HiCurrencyDollar } from "react-icons/hi";
import { useState } from "react";
import { Endpoints } from "../../config/endpoints";
import { useReloadTable, useResponseModalStore } from "../../../../hooks";

export const ActivePartnerModal = () => {
  const [file, setFile] = useState<File>();
  const { closeModal, partner, visible } = useActivePartnerModalStore();
  const reloadTable = useReloadTable((s) => s.reload);
  const showResp = useResponseModalStore((s) => s.showModal);
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    const keys = Object.keys(data);
    formData.append("active", "true");
    for (const key of keys) {
      formData.append(key, data[key]);
    }
    file && formData.append("image", file);
    const resp = await modify(`${Endpoints.PARTNERS}/${partner?.id}`, formData);
    if (!resp.error) {
      reloadTable();
      closeModal();
    }
    showResp(resp);
    return resp;
  };
  return (
    <Modal isOpen={visible} onClose={closeModal}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <p>Promocionar a {partner?.companyName}</p>
            </ModalHeader>
            <ModalBody>
              <CustomForm<Partner> defaultValues={partner} onSubmit={onSubmit}>
                {(register) => (
                  <div>
                    <InputForm
                      label="NIT o CC"
                      registerReturn={register("nit", {
                        required: "Campo obligatorio.",
                        maxLength: {
                          value: 10,
                          message: "Debe contener máximo 10 dígitos",
                        },
                        minLength: {
                          value: 6,
                          message: "Debe contener mínimo 6 dígitos",
                        },
                      })}
                    />
                    <InputForm
                      label="Empresa"
                      registerReturn={register("companyName", {
                        required: "Campo obligatorio.",
                      })}
                    />
                    <InputForm
                      label="Representante"
                      registerReturn={register("contact", {
                        required: "Campo obligatorio.",
                      })}
                    />
                    <InputForm
                      label="Teléfono"
                      registerReturn={register("contactNumber", {
                        required: "Campo obligatorio.",
                      })}
                    />
                    <InputForm
                      label="Correo"
                      registerReturn={register("email", {
                        required: "Campo obligatorio.",
                      })}
                    />
                    <InputForm
                      label="Sitio web"
                      registerReturn={register("webSite", {})}
                    />
                    <InputForm
                      label="Donación"
                      type="number"
                      icon={<HiCurrencyDollar className="text-secondary" />}
                      registerReturn={register("amount", {
                        required: "Campo obligatorio.",
                        min: {
                          value: 1000,
                          message: "La cantidad minima debe ser de $1.000",
                        },
                      })}
                    />
                    <FileUploadZone
                      onChangeFile={setFile}
                      config={{ image: "*" }}
                      text="Logo del patrocinador"
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
