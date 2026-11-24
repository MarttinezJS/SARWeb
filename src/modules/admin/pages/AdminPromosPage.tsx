import { useState } from "react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { addToast } from "@heroui/toast";
import {
  MdAdd,
  MdDeleteOutline,
  MdOutlineCampaign,
  MdOutlineEdit,
  MdOutlinePause,
  MdOutlinePlayArrow,
} from "react-icons/md";
import {
  ConfirmModal,
  EmptyState,
  Endpoints,
  ErrorState,
  formatShortDate,
  modify,
  remove,
} from "../../../common";
import { useApi } from "../../../hooks";
import {
  isImageOnly,
  PROMO_PLACEMENT_LABELS,
  promoStatus,
  type Promo,
  type PromoStatus,
} from "../../../models";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { PromoFormModal } from "../components/PromoFormModal";

const STATUS: Record<PromoStatus, { label: string; className: string; order: number }> = {
  vigente: { label: "En la app", className: "bg-success-200 text-success-800", order: 0 },
  programada: { label: "Programada", className: "bg-primary-200 text-primary-900", order: 1 },
  pausada: { label: "Pausada", className: "bg-default-200 text-default-700", order: 2 },
  vencida: { label: "Vencida", className: "bg-warning-200 text-warning-900", order: 3 },
};

type Dialog = { type: "form"; promo?: Promo } | { type: "delete"; promo: Promo };

export const AdminPromosPage = () => {
  const [reloadKey, setReloadKey] = useState(0);
  const [dialog, setDialog] = useState<Dialog>();
  const { data, error, isLoading, reload } = useApi<Promo[]>(Endpoints.ADMIN_PROMOS, reloadKey);
  const refresh = () => setReloadKey((key) => key + 1);
  const close = () => setDialog(undefined);

  const promos = [...(data ?? [])].sort(
    (a, b) =>
      STATUS[promoStatus(a)].order - STATUS[promoStatus(b)].order ||
      b.priority - a.priority ||
      new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime(),
  );

  const toggle = async (promo: Promo) => {
    const form = new FormData();
    form.append("active", String(!promo.active));
    const resp = await modify<Promo>(`${Endpoints.ADMIN_PROMOS}/${promo.id}`, form);
    addToast(
      resp.error
        ? { title: "No se pudo cambiar el estado", description: resp.message, color: "danger" }
        : { title: promo.active ? "Promoción pausada" : "Promoción publicada", color: "success" },
    );
    if (!resp.error) refresh();
  };

  return (
    <>
      <AdminPageHeader
        title="Promociones"
        description="Eventos y campañas que aparecen en la app móvil. Solo se muestran entre sus fechas de inicio y fin."
      >
        <Button
          color="secondary"
          startContent={<MdAdd aria-hidden="true" className="text-xl" />}
          onPress={() => setDialog({ type: "form" })}
        >
          Nueva promoción
        </Button>
      </AdminPageHeader>

      {isLoading && !data ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-80 rounded-2xl" />
          ))}
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : promos.length === 0 ? (
        <EmptyState
          icon={<MdOutlineCampaign />}
          title="Aún no hay promociones"
          description="Crea la primera para anunciar un evento o una campaña en la app."
        >
          <Button color="secondary" onPress={() => setDialog({ type: "form" })}>
            Nueva promoción
          </Button>
        </EmptyState>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {promos.map((promo) => {
            const status = STATUS[promoStatus(promo)];
            return (
              <li key={promo.id} className="surface flex flex-col overflow-hidden">
                <div className="relative aspect-[4/3] bg-primary-100">
                  <img
                    src={promo.imageUrl}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <Chip size="sm" className={`absolute top-2 left-2 font-semibold ${status.className}`}>
                    {status.label}
                  </Chip>
                  {promo.priority > 0 && (
                    <Chip size="sm" className="absolute top-2 right-2 bg-secondary text-white">
                      Prioridad {promo.priority}
                    </Chip>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h2 className="title text-xl leading-tight font-bold text-secondary">
                    {promo.title ?? (isImageOnly(promo) ? "Solo imagen" : "Sin título")}
                  </h2>
                  {promo.body && <p className="line-clamp-2 text-sm text-muted">{promo.body}</p>}
                  <p className="text-sm text-secondary">
                    {formatShortDate(promo.startsAt)} – {formatShortDate(promo.endsAt)}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {promo.placements.map((p) => (
                      <Chip key={p} size="sm" variant="bordered" className="border-secondary/30">
                        {PROMO_PLACEMENT_LABELS[p]}
                      </Chip>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap justify-end gap-1 pt-2">
                    <Button
                      size="sm"
                      variant="light"
                      color="secondary"
                      startContent={<MdOutlineEdit aria-hidden="true" />}
                      onPress={() => setDialog({ type: "form", promo })}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="light"
                      color="secondary"
                      startContent={
                        promo.active ? (
                          <MdOutlinePause aria-hidden="true" />
                        ) : (
                          <MdOutlinePlayArrow aria-hidden="true" />
                        )
                      }
                      onPress={() => toggle(promo)}
                    >
                      {promo.active ? "Pausar" : "Publicar"}
                    </Button>
                    <Button
                      size="sm"
                      variant="light"
                      color="danger"
                      startContent={<MdDeleteOutline aria-hidden="true" />}
                      onPress={() => setDialog({ type: "delete", promo })}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <PromoFormModal
        isOpen={dialog?.type === "form"}
        promo={dialog?.type === "form" ? dialog.promo : undefined}
        onClose={close}
        onSaved={refresh}
      />
      <ConfirmModal
        isOpen={dialog?.type === "delete"}
        onClose={close}
        title="Eliminar promoción"
        confirmLabel="Eliminar"
        onConfirm={async () => {
          if (dialog?.type !== "delete") return;
          const resp = await remove(`${Endpoints.ADMIN_PROMOS}/${dialog.promo.id}`);
          if (resp.error) {
            addToast({ title: "No se pudo eliminar", description: resp.message, color: "danger" });
            return;
          }
          addToast({ title: "Promoción eliminada", color: "success" });
          close();
          refresh();
        }}
      >
        La promoción «{dialog?.type === "delete" ? (dialog.promo.title ?? "Solo imagen") : ""}»
        dejará de mostrarse en la app y no se podrá recuperar. Si solo quieres ocultarla un
        tiempo, usa «Pausar».
      </ConfirmModal>
    </>
  );
};
