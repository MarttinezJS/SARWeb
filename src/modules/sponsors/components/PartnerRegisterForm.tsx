import { addToast } from "@heroui/toast";
import { MdSend } from "react-icons/md";
import { CustomForm, Endpoints, InputForm, save } from "../../../common";
import type { PartnerRegisterFields } from "../../../models";
import { partnerRules } from "../partnerRules";

/** Formulario público para empresas interesadas en patrocinar (POST /partners). */
export const PartnerRegisterForm = () => (
  <CustomForm<PartnerRegisterFields>
    aria-label="Registro de patrocinadores"
    defaultValues={{ companyName: "", nit: "", contact: "", contactNumber: "", email: "" }}
    submitLabel="Enviar solicitud"
    submitIcon={<MdSend aria-hidden="true" />}
    onSubmit={async (data) => {
      const resp = await save<unknown>(Endpoints.PARTNERS_REGISTER, {
        ...data,
        companyName: data.companyName.trim(),
        contact: data.contact.trim(),
        email: data.email.trim(),
      });
      if (resp.error) {
        addToast({
          title:
            resp.status === 429
              ? "Demasiadas solicitudes"
              : "No pudimos registrar tu solicitud",
          description:
            resp.status === 429
              ? "Se alcanzó el límite de registros por hora. Inténtalo más tarde."
              : resp.message,
          color: "danger",
        });
      } else {
        addToast({
          title: "¡Solicitud enviada!",
          description: "Nuestro equipo te contactará pronto.",
          color: "success",
        });
      }
      return resp;
    }}
  >
    <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
      <InputForm<PartnerRegisterFields>
        name="companyName"
        label="Nombre de la empresa"
        autoComplete="organization"
        rules={partnerRules.companyName}
      />
      <InputForm<PartnerRegisterFields>
        name="nit"
        label="NIT"
        description="Solo números, sin dígito de verificación."
        onlyDigits
        maxLength={10}
        rules={partnerRules.nit}
      />
      <InputForm<PartnerRegisterFields>
        name="contact"
        label="Persona de contacto"
        autoComplete="name"
        rules={partnerRules.contact}
      />
      <InputForm<PartnerRegisterFields>
        name="contactNumber"
        label="Teléfono de contacto"
        type="tel"
        autoComplete="tel-national"
        onlyDigits
        maxLength={10}
        rules={partnerRules.contactNumber}
      />
      <div className="sm:col-span-2">
        <InputForm<PartnerRegisterFields>
          name="email"
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          rules={partnerRules.email}
        />
      </div>
    </div>
  </CustomForm>
);
