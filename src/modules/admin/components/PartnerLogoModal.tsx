import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { MdUpload } from "react-icons/md";
import { CustomForm, Endpoints, ImageForm, modify, save, toFormData } from "../../../common";
import type { Partner } from "../../../models";
import { FormModal } from "./FormModal";

interface PartnerLogoModalProps {
  partner?: Partner;
  onClose: () => void;
  onSaved: () => void;
}

interface LogoFields {
  image: File | null;
}

/**
 * Cambia solo el logo. Para un patrocinador activo se usa PUT con
 * `active=true`, porque `POST /data/partners/:id/logo` lo deja inactivo
 * (el backend trata la ausencia de `active` como false).
 */
const uploadLogo = (partner: Partner, image: File | null) =>
  partner.active
    ? modify<Partner>(
        `${Endpoints.ADMIN_PARTNERS}/${partner.id}`,
        toFormData({ image, active: true }),
      )
    : save<Partner>(`${Endpoints.ADMIN_PARTNERS}/${partner.id}/logo`, toFormData({ image }));

export const PartnerLogoModal = ({ partner, onClose, onSaved }: PartnerLogoModalProps) => (
  <FormModal
    isOpen={Boolean(partner)}
    onClose={onClose}
    title="Cambiar logo"
    description={partner?.companyName}
    size="lg"
  >
    {partner && (
      <CustomForm<LogoFields>
        key={partner.id}
        aria-label="Cambiar logo"
        defaultValues={{ image: null }}
        submitLabel="Guardar logo"
        loadingLabel="Subiendo…"
        submitIcon={<MdUpload aria-hidden="true" />}
        actions={
          <Button variant="light" color="secondary" onPress={onClose}>
            Cancelar
          </Button>
        }
        onSubmit={async ({ image }) => {
          const resp = await uploadLogo(partner, image);
          if (resp.error) {
            addToast({
              title: "No se pudo cambiar el logo",
              description: resp.message,
              color: "danger",
            });
            return resp;
          }
          addToast({ title: "Logo actualizado", color: "success" });
          onSaved();
          onClose();
          return resp;
        }}
      >
        <ImageForm<LogoFields>
          name="image"
          label="Nuevo logo"
          fit="contain"
          defaultImageUrl={partner.imageUrl}
          rules={{ required: "Elige la imagen del logo" }}
        />
        {partner.active && (
          <p className="mt-3 text-xs text-muted">
            Como la suscripción está activa, al guardar también se renueva: inicia hoy
            y vence en un año.
          </p>
        )}
      </CustomForm>
    )}
  </FormModal>
);
