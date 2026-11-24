import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import {
  AreaForm,
  CustomForm,
  Endpoints,
  ImageForm,
  InputForm,
  modify,
  save,
  SwitchForm,
} from "../../../common";
import type { Partner, PartnerFields } from "../../../models";
import { partnerRules } from "../../sponsors/partnerRules";
import { FormModal } from "./FormModal";

interface PartnerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Patrocinador a editar; sin él, el formulario crea uno nuevo. */
  partner?: Partner;
  onSaved: () => void;
}

/**
 * Arma el multipart de un patrocinador. `active` solo se envía cuando es
 * verdadero: el backend convierte cualquier texto (incluido "false") en true.
 * Al editar, los opcionales vacíos se envían para poder borrarlos.
 */
const toPartnerForm = (data: PartnerFields, isEdit: boolean): FormData => {
  const form = new FormData();
  form.append("companyName", data.companyName.trim());
  form.append("nit", data.nit);
  form.append("contact", data.contact.trim());
  form.append("contactNumber", data.contactNumber);
  form.append("email", data.email.trim());
  for (const key of ["webSite", "about", "amount"] as const) {
    const value = data[key].trim();
    if (value || isEdit) form.append(key, value);
  }
  if (data.active) form.append("active", "true");
  if (data.image) form.append("image", data.image);
  return form;
};

export const PartnerFormModal = ({ isOpen, onClose, partner, onSaved }: PartnerFormModalProps) => {
  const isEdit = Boolean(partner);
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Editar patrocinador" : "Nuevo patrocinador"}
      description={
        isEdit ? partner?.companyName : "Registra una empresa y, si ya hay acuerdo, actívala."
      }
      size="3xl"
    >
      <CustomForm<PartnerFields>
        // La clave reinicia el formulario al cambiar de patrocinador.
        key={partner?.id ?? "nuevo"}
        aria-label={isEdit ? "Editar patrocinador" : "Nuevo patrocinador"}
        defaultValues={{
          companyName: partner?.companyName ?? "",
          nit: partner?.nit ?? "",
          contact: partner?.contact ?? "",
          contactNumber: partner?.contactNumber ?? "",
          email: partner?.email ?? "",
          webSite: partner?.webSite ?? "",
          about: partner?.about ?? "",
          amount: partner?.amount ?? "",
          active: Boolean(partner?.active),
          image: null,
        }}
        submitLabel={isEdit ? "Guardar cambios" : "Registrar patrocinador"}
        loadingLabel="Guardando…"
        actions={
          <Button variant="light" color="secondary" onPress={onClose}>
            Cancelar
          </Button>
        }
        onSubmit={async (data) => {
          const form = toPartnerForm(data, isEdit);
          const resp = partner
            ? await modify<Partner>(`${Endpoints.ADMIN_PARTNERS}/${partner.id}`, form)
            : await save<Partner>(Endpoints.ADMIN_PARTNERS, form);
          if (resp.error) {
            addToast({
              title: isEdit
                ? "No se pudo guardar el patrocinador"
                : "No se pudo registrar el patrocinador",
              description: resp.message,
              color: "danger",
            });
            return resp;
          }
          addToast({
            title: isEdit ? "Patrocinador actualizado" : "Patrocinador registrado",
            color: "success",
          });
          onSaved();
          onClose();
          return resp;
        }}
      >
        <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
          <InputForm<PartnerFields>
            name="companyName"
            label="Nombre de la empresa"
            rules={partnerRules.companyName}
          />
          <InputForm<PartnerFields>
            name="nit"
            label="NIT"
            onlyDigits
            maxLength={10}
            rules={partnerRules.nit}
          />
          <InputForm<PartnerFields>
            name="contact"
            label="Persona de contacto"
            rules={partnerRules.contact}
          />
          <InputForm<PartnerFields>
            name="contactNumber"
            label="Teléfono de contacto"
            type="tel"
            onlyDigits
            maxLength={10}
            rules={partnerRules.contactNumber}
          />
          <InputForm<PartnerFields>
            name="email"
            label="Correo electrónico"
            type="email"
            rules={partnerRules.email}
          />
          <InputForm<PartnerFields>
            name="webSite"
            label="Sitio web"
            type="url"
            placeholder="https://"
            rules={{
              validate: (value) =>
                !value ||
                /^(https?:\/\/)?[\w-]+(\.[\w-]+)+\S*$/i.test(String(value).trim()) ||
                "Dirección web no válida",
            }}
          />
          <InputForm<PartnerFields>
            name="amount"
            label="Aporte acordado"
            description="Texto libre, por ejemplo: 200.000 mensuales."
            maxLength={60}
          />
          <SwitchForm<PartnerFields>
            name="active"
            label="Suscripción activa"
            description={
              isEdit
                ? "Al guardar activa, la suscripción se renueva: inicia hoy y vence en un año. Si la apagas, se desactiva."
                : "Activa: aparece en el sitio; inicia hoy y vence en un año."
            }
          />
          <div className="sm:col-span-2">
            <AreaForm<PartnerFields>
              name="about"
              label="Descripción del negocio"
              description="Se muestra junto al logo en la página de patrocinadores."
              minRows={2}
              maxRows={5}
              maxLength={500}
            />
          </div>
          <div className="sm:col-span-2">
            <ImageForm<PartnerFields>
              name="image"
              label={isEdit ? "Logo (opcional: reemplaza el actual)" : "Logo"}
              fit="contain"
              defaultImageUrl={partner?.imageUrl}
            />
          </div>
        </div>
      </CustomForm>
    </FormModal>
  );
};
