import { Partner } from "../models";
import {
  CustomForm,
  FileUploadZone,
  InputForm,
  PaginatedTable,
  save,
  SwitchForm,
} from "../../../common";
import { Endpoints } from "../config/endpoints";
import { FaImage } from "react-icons/fa6";
import { columns } from "../config/PartnerColumns";
import { FaCheck } from "react-icons/fa";
import { ActivePartnerModal, ImageModal } from "../components";
import { useActivePartnerModalStore, useImageModalStore } from "../hooks";
import { useReloadTable, useResponseModalStore } from "../../../hooks";
import { useState } from "react";
import { HiCurrencyDollar } from "react-icons/hi";
import { Spacer } from "@nextui-org/react";

export const Patterns = () => {
  const showImageModal = useImageModalStore((s) => s.showModal);
  const [file, setFile] = useState<File>();
  const showActivePartnerModal = useActivePartnerModalStore((s) => s.showModal);
  const showResp = useResponseModalStore((s) => s.showModal);
  const reloadTable = useReloadTable((s) => s.reload);
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    const keys = Object.keys(data);
    for (const key of keys) {
      formData.append(key, data[key]);
    }
    file && formData.append("image", file);
    const resp = await save(Endpoints.PARTNERS, formData);
    if (!resp.error) {
      reloadTable();
    }
    showResp(resp);
    return resp;
  };
  return (
    <div className="p-2">
      <CustomForm<Partner> onSubmit={onSubmit}>
        {(register) => (
          <div>
            <div className="grid grid-cols-3 gap-2">
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
              <SwitchForm
                label="Promocionar"
                registerReturn={register("active")}
              />
            </div>
            <FileUploadZone
              onChangeFile={setFile}
              config={{ image: "*" }}
              text="Logo del patrocinador"
            />
          </div>
        )}
      </CustomForm>
      <Spacer />
      <PaginatedTable<Partner>
        endpoint={Endpoints.PARTNERS}
        actions={[
          {
            label: "Logo",
            visibleIf: (partner) => partner.active,
            icon: <FaImage />,
            action: showImageModal,
          },
          {
            label: "Anunciar",
            visibleIf: (partner) => !partner.active,
            icon: <FaCheck />,
            action: showActivePartnerModal,
            color: "success",
          },
        ]}
        columns={columns}
      />
      <ImageModal />
      <ActivePartnerModal />
    </div>
  );
};
