import { useState } from "react";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { addToast } from "@heroui/toast";
import { MdDeleteOutline, MdOutlineMenuBook, MdUpload } from "react-icons/md";
import {
  ActionButton,
  CustomForm,
  EmptyState,
  Endpoints,
  ErrorState,
  formatDate,
  formatShortDate,
  ImageForm,
  save,
  toFormData,
} from "../../../common";
import { useApi } from "../../../hooks";
import type { Devotional } from "../../../models";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { NO_API_REASON } from "../components/ComingSoon";

interface DevotionalFields {
  file: File | null;
}

const byNewest = (a: Devotional, b: Devotional) =>
  new Date(b.createdDate ?? 0).getTime() - new Date(a.createdDate ?? 0).getTime() || b.id - a.id;

export const AdminDevotionalsPage = () => {
  const [reloadKey, setReloadKey] = useState(0);
  const { data, error, isLoading, reload } = useApi<Devotional[]>(
    Endpoints.ADMIN_DEVOTIONAL,
    reloadKey,
  );
  const devotionals = [...(data ?? [])].sort(byNewest);

  return (
    <>
      <AdminPageHeader
        title="Devocionales"
        description="La imagen más reciente es la que se muestra como «Devocional del día» en el sitio."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <section aria-labelledby="subir-devocional" className="surface p-5 lg:col-span-2 lg:self-start">
          <h2 id="subir-devocional" className="title mb-4 text-2xl font-bold text-secondary">
            Subir el devocional de hoy
          </h2>
          <CustomForm<DevotionalFields>
            aria-label="Subir devocional"
            defaultValues={{ file: null }}
            submitLabel="Publicar devocional"
            loadingLabel="Subiendo…"
            submitIcon={<MdUpload aria-hidden="true" />}
            submitFullWidth
            onSubmit={async ({ file }) => {
              const resp = await save<Devotional>(
                Endpoints.ADMIN_DEVOTIONAL,
                toFormData({ file }),
              );
              if (resp.error) {
                addToast({
                  title: "No se pudo publicar el devocional",
                  description: resp.message,
                  color: "danger",
                });
                return resp;
              }
              addToast({ title: "Devocional publicado", color: "success" });
              setReloadKey((key) => key + 1);
              return resp;
            }}
          >
            <ImageForm<DevotionalFields>
              name="file"
              label="Imagen del devocional"
              fit="contain"
              rules={{ required: "Elige la imagen del devocional" }}
            />
          </CustomForm>
        </section>

        <section aria-labelledby="galeria-devocionales" className="lg:col-span-3">
          <h2 id="galeria-devocionales" className="title mb-4 text-2xl font-bold text-secondary">
            Publicados{" "}
            {data && (
              <span className="font-funnel text-base font-normal text-muted">
                ({devotionals.length})
              </span>
            )}
          </h2>
          {isLoading && !data ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          ) : error ? (
            <ErrorState message={error} onRetry={reload} />
          ) : devotionals.length === 0 ? (
            <EmptyState
              icon={<MdOutlineMenuBook />}
              title="Aún no hay devocionales"
              description="Sube la primera imagen con el formulario."
            />
          ) : (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {devotionals.map((devotional, index) => (
                <li key={devotional.id} className="surface overflow-hidden">
                  <a
                    href={devotional.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    aria-label={`Abrir el devocional del ${formatDate(devotional.createdDate)} en una pestaña nueva`}
                  >
                    <img
                      src={devotional.imageUrl}
                      alt=""
                      loading="lazy"
                      className="aspect-square w-full object-cover"
                    />
                  </a>
                  <div className="flex items-center justify-between gap-1 p-2">
                    <div className="min-w-0">
                      <p className="truncate text-xs text-muted">
                        {formatShortDate(devotional.createdDate)}
                      </p>
                      {index === 0 && (
                        <Chip size="sm" variant="flat" color="success" className="mt-1 text-success-700">
                          En el sitio
                        </Chip>
                      )}
                    </div>
                    <ActionButton
                      label="Eliminar"
                      icon={<MdDeleteOutline aria-hidden="true" />}
                      color="danger"
                      action={() => {}}
                      disabled
                      disabledReason={NO_API_REASON}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};
