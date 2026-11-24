import { useEffect, useMemo } from "react";
import { useWatch } from "react-hook-form";
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
import { PROMO_PLACEMENT_LABELS, type Promo, type PromoPlacement } from "../../../models";
import { FormModal } from "./FormModal";
import { PromoPreview } from "./PromoPreview";

export interface PromoFields {
  image: File | null;
  title: string;
  body: string;
  ctaLabel: string;
  ctaUrl: string;
  startsAt: string;
  endsAt: string;
  priority: string;
  active: boolean;
  RADIO: boolean;
  POPUP: boolean;
  EXPLORAR: boolean;
}

const PLACEMENTS = Object.keys(PROMO_PLACEMENT_LABELS) as PromoPlacement[];
const PLACEMENT_HELP: Record<PromoPlacement, string> = {
  RADIO: "Tarjeta bajo el reproductor. Se muestra la de mayor prioridad.",
  POPUP: "Se abre una sola vez por teléfono al entrar a la app.",
  EXPLORAR: "Carrusel de la pestaña Explorar.",
};

/** Fecha (YYYY-MM-DD) en hora de Colombia, para los campos de fecha. */
const toDay = (value?: string | Date) =>
  new Date(value ?? Date.now()).toLocaleDateString("en-CA", { timeZone: "America/Bogota" });

const addDays = (days: number) => toDay(new Date(Date.now() + days * 86_400_000));

/** Multipart para la API. Los textos vacíos se envían para poder borrarlos. */
const toPromoForm = (data: PromoFields): FormData => {
  const form = new FormData();
  for (const key of ["title", "body", "ctaLabel", "ctaUrl"] as const) {
    form.append(key, data[key].trim());
  }
  form.append("startsAt", data.startsAt);
  form.append("endsAt", data.endsAt);
  form.append("priority", data.priority || "0");
  form.append("active", String(data.active));
  form.append("placements", PLACEMENTS.filter((p) => data[p]).join(","));
  if (data.image) form.append("image", data.image);
  return form;
};

/** Vista previa que sigue los cambios del formulario. */
const LivePreview = ({ currentImage }: { currentImage?: string }) => {
  const [image, title, body, ctaLabel, ctaUrl] = useWatch<PromoFields>({
    name: ["image", "title", "body", "ctaLabel", "ctaUrl"],
  }) as [File | null, string, string, string, string];
  const objectUrl = useMemo(() => (image ? URL.createObjectURL(image) : undefined), [image]);
  useEffect(
    () => () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    },
    [objectUrl],
  );

  return (
    <PromoPreview
      imageUrl={objectUrl ?? currentImage}
      title={title}
      body={body}
      ctaLabel={ctaLabel}
      ctaUrl={ctaUrl}
    />
  );
};

interface PromoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Promoción a editar; sin ella el formulario crea una nueva. */
  promo?: Promo;
  onSaved: () => void;
}

export const PromoFormModal = ({ isOpen, onClose, promo, onSaved }: PromoFormModalProps) => {
  const isEdit = Boolean(promo);
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Editar promoción" : "Nueva promoción"}
      description="Sube una imagen. Si no escribes título ni texto, la app la muestra como imagen sola."
      size="3xl"
    >
      <CustomForm<PromoFields>
        key={promo?.id ?? "nueva"}
        aria-label={isEdit ? "Editar promoción" : "Nueva promoción"}
        defaultValues={{
          image: null,
          title: promo?.title ?? "",
          body: promo?.body ?? "",
          ctaLabel: promo?.ctaLabel ?? "",
          ctaUrl: promo?.ctaUrl ?? "",
          startsAt: promo ? toDay(promo.startsAt) : toDay(),
          endsAt: promo ? toDay(promo.endsAt) : addDays(14),
          priority: String(promo?.priority ?? 0),
          active: promo?.active ?? true,
          RADIO: promo ? promo.placements.includes("RADIO") : true,
          POPUP: promo ? promo.placements.includes("POPUP") : false,
          EXPLORAR: promo ? promo.placements.includes("EXPLORAR") : true,
        }}
        submitLabel={isEdit ? "Guardar cambios" : "Publicar promoción"}
        loadingLabel="Guardando…"
        resetOnSuccess={false}
        actions={
          <Button variant="light" color="secondary" onPress={onClose}>
            Cancelar
          </Button>
        }
        onSubmit={async (data, form) => {
          if (!PLACEMENTS.some((p) => data[p])) {
            form.setError("RADIO", { message: "Elige al menos un lugar donde mostrarla." });
            addToast({ title: "Elige dónde mostrar la promoción", color: "warning" });
            return;
          }
          const body = toPromoForm(data);
          const resp = promo
            ? await modify<Promo>(`${Endpoints.ADMIN_PROMOS}/${promo.id}`, body)
            : await save<Promo>(Endpoints.ADMIN_PROMOS, body);
          if (resp.error) {
            addToast({
              title: isEdit ? "No se pudo guardar la promoción" : "No se pudo publicar la promoción",
              description: resp.message,
              color: "danger",
            });
            return resp;
          }
          addToast({
            title: isEdit ? "Promoción actualizada" : "Promoción publicada",
            color: "success",
          });
          onSaved();
          onClose();
          return resp;
        }}
      >
        {(form) => (
          <div className="grid gap-6 md:grid-cols-[1fr_auto]">
            <div className="flex min-w-0 flex-col gap-5">
              <ImageForm<PromoFields>
                name="image"
                label="Imagen (vertical 4:5, p. ej. 1080 × 1350 px)"
                defaultImageUrl={promo?.imageUrl}
                fit="cover"
                rules={isEdit ? undefined : { required: "Elige la imagen de la promoción" }}
              />
              <InputForm<PromoFields>
                name="title"
                label="Título (opcional)"
                maxLength={80}
                placeholder="Noche de alabanza"
              />
              <AreaForm<PromoFields>
                name="body"
                label="Texto (opcional)"
                maxLength={280}
                minRows={2}
                placeholder="Cuándo, dónde y qué deben saber los oyentes."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <InputForm<PromoFields>
                  name="ctaLabel"
                  label="Texto del botón (opcional)"
                  maxLength={30}
                  placeholder="Cómo llegar"
                />
                <InputForm<PromoFields>
                  name="ctaUrl"
                  label="Enlace del botón"
                  type="url"
                  placeholder="https://…"
                  rules={{
                    pattern: {
                      value: /^https?:\/\/\S+$/,
                      message: "El enlace debe empezar por http:// o https://",
                    },
                  }}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <InputForm<PromoFields>
                  name="startsAt"
                  label="Desde"
                  type="date"
                  rules={{ required: "Indica la fecha de inicio" }}
                />
                <InputForm<PromoFields>
                  name="endsAt"
                  label="Hasta"
                  type="date"
                  rules={{
                    required: "Indica la fecha final",
                    validate: (value, values) =>
                      String(value ?? "") >= values.startsAt ||
                      "Debe ser igual o posterior a «Desde»",
                  }}
                />
                <InputForm<PromoFields>
                  name="priority"
                  label="Prioridad (0-100)"
                  type="number"
                  onlyDigits
                  rules={{
                    validate: (value) => {
                      const n = Number(value ?? 0);
                      return (Number.isInteger(n) && n >= 0 && n <= 100) || "Entre 0 y 100";
                    },
                  }}
                />
              </div>
              <fieldset className="flex flex-col gap-2">
                <legend className="mb-2 text-sm font-medium text-secondary">Mostrar en</legend>
                {PLACEMENTS.map((placement) => (
                  <SwitchForm<PromoFields>
                    key={placement}
                    name={placement}
                    label={PROMO_PLACEMENT_LABELS[placement]}
                    description={PLACEMENT_HELP[placement]}
                  />
                ))}
                {form.formState.errors.RADIO && (
                  <p role="alert" className="text-sm text-danger">
                    {form.formState.errors.RADIO.message}
                  </p>
                )}
              </fieldset>
              <SwitchForm<PromoFields>
                name="active"
                label="Publicada"
                description="Apágala para pausarla sin borrarla."
              />
            </div>
            <div className="md:sticky md:top-0 md:self-start">
              <LivePreview currentImage={promo?.imageUrl} />
            </div>
          </div>
        )}
      </CustomForm>
    </FormModal>
  );
};
