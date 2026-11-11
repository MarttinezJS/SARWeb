import { useState } from "react";
import { useSearchParams } from "react-router";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { Tab, Tabs } from "@heroui/tabs";
import { addToast } from "@heroui/toast";
import {
  MdAdd,
  MdCheckCircleOutline,
  MdOutlineCancel,
  MdOutlineEdit,
  MdOutlineImage,
  MdOutlineMarkEmailRead,
} from "react-icons/md";
import {
  ConfirmModal,
  EmptyState,
  Endpoints,
  ErrorState,
  formatShortDate,
  modify,
  PaginatedTable,
  remove,
  toFormData,
  type Action,
  type Column,
} from "../../../common";
import { useApi } from "../../../hooks";
import { isPartnerRequest, type Pagination, type Partner } from "../../../models";
import { PartnerLogo } from "../../sponsors/components/PartnerLogo";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { PartnerFormModal } from "../components/PartnerFormModal";
import { PartnerLogoModal } from "../components/PartnerLogoModal";
import { REQUESTS_PAGE_SIZE } from "../constants";

const isExpired = (partner: Partner): boolean =>
  Boolean(partner.expirationDate) && new Date(partner.expirationDate ?? 0).getTime() < Date.now();

const StatusChip = ({ partner }: { partner: Partner }) => {
  if (partner.active) {
    return isExpired(partner) ? (
      <Chip size="sm" variant="flat" color="warning" className="bg-warning-200 text-warning-900">
        Activo · vencido
      </Chip>
    ) : (
      <Chip size="sm" variant="flat" color="success" className="text-success-700">
        Activo
      </Chip>
    );
  }
  return isPartnerRequest(partner) ? (
    <Chip size="sm" variant="flat" color="primary" className="text-primary-900">
      Solicitud
    </Chip>
  ) : (
    <Chip size="sm" variant="flat" color="default">
      Inactivo
    </Chip>
  );
};

const columns: Column<Partner>[] = [
  {
    id: "companyName",
    name: "Empresa",
    render: (partner) => (
      <div className="flex min-w-0 items-center gap-3">
        <PartnerLogo partner={partner} className="h-12 w-12 shrink-0 p-1! [&>span]:text-base" />
        <div className="min-w-0">
          <p className="truncate font-semibold">{partner.companyName}</p>
          <p className="text-xs text-muted">NIT {partner.nit}</p>
        </div>
      </div>
    ),
  },
  {
    id: "contact",
    name: "Contacto",
    hideOnMobile: true,
    render: (partner) => (
      <div className="min-w-0 text-sm">
        <p className="truncate">{partner.contact}</p>
        <p className="truncate text-xs text-muted">
          {partner.contactNumber} · {partner.email}
        </p>
      </div>
    ),
  },
  { id: "active", name: "Estado", render: (partner) => <StatusChip partner={partner} /> },
  {
    id: "expirationDate",
    name: "Vencimiento",
    hideOnMobile: true,
    render: (partner) => (
      <span className="whitespace-nowrap">
        {partner.expirationDate ? formatShortDate(partner.expirationDate) : "—"}
      </span>
    ),
  },
];

type Dialog =
  | { type: "form"; partner?: Partner }
  | { type: "logo"; partner: Partner }
  | { type: "cancel"; partner: Partner }
  | { type: "activate"; partner: Partner };

export const AdminPartnersPage = () => {
  const [params, setParams] = useSearchParams();
  const [dialog, setDialog] = useState<Dialog | undefined>(() =>
    params.get("nuevo") === "1" ? { type: "form" } : undefined,
  );
  const [reloadKey, setReloadKey] = useState(0);
  const view = params.get("vista") === "solicitudes" ? "solicitudes" : "todos";

  // Solicitudes: empresas inactivas que nunca tuvieron suscripción.
  const all = useApi<Pagination<Partner>>(
    `${Endpoints.ADMIN_PARTNERS}?page=0&size=${REQUESTS_PAGE_SIZE}`,
    reloadKey,
  );
  const requests = (all.data?.results ?? []).filter(isPartnerRequest);
  const isTruncated = (all.data?.count ?? 0) > REQUESTS_PAGE_SIZE;

  const close = () => setDialog(undefined);
  const refresh = () => setReloadKey((key) => key + 1);

  const actions: Action<Partner>[] = [
    {
      label: "Editar",
      icon: <MdOutlineEdit aria-hidden="true" />,
      action: (partner) => setDialog({ type: "form", partner }),
    },
    {
      label: "Cambiar logo",
      icon: <MdOutlineImage aria-hidden="true" />,
      action: (partner) => setDialog({ type: "logo", partner }),
    },
    {
      label: "Activar suscripción",
      icon: <MdCheckCircleOutline aria-hidden="true" />,
      color: "success",
      visibleIf: (partner) => !partner.active,
      action: (partner) => setDialog({ type: "activate", partner }),
    },
    {
      label: "Cancelar suscripción",
      icon: <MdOutlineCancel aria-hidden="true" />,
      color: "danger",
      visibleIf: (partner) => Boolean(partner.active),
      action: (partner) => setDialog({ type: "cancel", partner }),
    },
  ];

  return (
    <>
      <AdminPageHeader
        title="Patrocinadores"
        description="Empresas que apoyan a la emisora y solicitudes recibidas desde el formulario público."
      >
        <Button
          color="secondary"
          startContent={<MdAdd aria-hidden="true" className="text-xl" />}
          onPress={() => setDialog({ type: "form" })}
        >
          Nuevo patrocinador
        </Button>
      </AdminPageHeader>

      <Tabs
        aria-label="Vistas de patrocinadores"
        color="secondary"
        variant="underlined"
        selectedKey={view}
        onSelectionChange={(key) =>
          setParams(key === "solicitudes" ? { vista: "solicitudes" } : {}, { replace: true })
        }
        classNames={{ tabList: "border-b border-secondary/15 w-full p-0", panel: "px-0 pt-4" }}
      >
        <Tab key="todos" title="Todos">
          <PaginatedTable<Partner>
            aria-label="Patrocinadores"
            endpoint={Endpoints.ADMIN_PARTNERS}
            columns={columns}
            actions={actions}
            reloadKey={reloadKey}
            emptyContent="Todavía no hay patrocinadores registrados."
          />
        </Tab>
        <Tab
          key="solicitudes"
          title={
            <span className="flex items-center gap-2">
              Solicitudes
              {requests.length > 0 && (
                <Chip size="sm" color="primary" className="font-bold">
                  {requests.length}
                </Chip>
              )}
            </span>
          }
        >
          <p className="mb-4 text-sm text-muted">
            Empresas que se registraron desde la página pública y aún no tienen una
            suscripción activa. Contáctalas y actívalas cuando haya acuerdo.
          </p>
          {all.isLoading && !all.data ? (
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 2 }, (_, i) => (
                <Skeleton key={i} className="h-36 rounded-2xl" />
              ))}
            </div>
          ) : all.error ? (
            <ErrorState message={all.error} onRetry={all.reload} />
          ) : requests.length === 0 ? (
            <EmptyState
              icon={<MdOutlineMarkEmailRead />}
              title="No hay solicitudes pendientes"
              description="Cuando una empresa llene el formulario de patrocinadores aparecerá aquí."
            />
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {requests.map((partner) => (
                <li key={partner.id} className="surface flex flex-col gap-3 p-4">
                  <div className="min-w-0">
                    <h2 className="title truncate text-xl font-bold text-secondary">
                      {partner.companyName}
                    </h2>
                    <p className="text-xs text-muted">NIT {partner.nit}</p>
                  </div>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                    <dt className="text-muted">Contacto</dt>
                    <dd className="min-w-0 truncate">{partner.contact}</dd>
                    <dt className="text-muted">Teléfono</dt>
                    <dd>
                      <a href={`tel:${partner.contactNumber}`} className="rounded underline">
                        {partner.contactNumber}
                      </a>
                    </dd>
                    <dt className="text-muted">Correo</dt>
                    <dd className="min-w-0 truncate">
                      <a href={`mailto:${partner.email}`} className="rounded underline">
                        {partner.email}
                      </a>
                    </dd>
                  </dl>
                  <div className="mt-auto flex flex-wrap justify-end gap-2">
                    <Button
                      size="sm"
                      variant="bordered"
                      color="secondary"
                      onPress={() => setDialog({ type: "form", partner })}
                    >
                      Completar datos
                    </Button>
                    <Button
                      size="sm"
                      color="success"
                      onPress={() => setDialog({ type: "activate", partner })}
                    >
                      Activar
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {isTruncated && (
            <p className="mt-3 text-xs text-muted">
              Se revisaron los primeros {REQUESTS_PAGE_SIZE} registros; puede haber más
              solicitudes en la pestaña «Todos».
            </p>
          )}
        </Tab>
      </Tabs>

      <PartnerFormModal
        isOpen={dialog?.type === "form"}
        onClose={close}
        partner={dialog?.type === "form" ? dialog.partner : undefined}
        onSaved={refresh}
      />
      <PartnerLogoModal
        partner={dialog?.type === "logo" ? dialog.partner : undefined}
        onClose={close}
        onSaved={refresh}
      />
      <ConfirmModal
        isOpen={dialog?.type === "cancel"}
        onClose={close}
        title="Cancelar suscripción"
        confirmLabel="Sí, cancelar suscripción"
        onConfirm={async () => {
          if (dialog?.type !== "cancel") return;
          const resp = await remove<Partner>(
            `${Endpoints.ADMIN_PARTNERS}/${dialog.partner.id}/sub`,
          );
          if (resp.error) {
            addToast({
              title: "No se pudo cancelar la suscripción",
              description: resp.message,
              color: "danger",
            });
            return;
          }
          addToast({ title: "Suscripción cancelada", color: "success" });
          refresh();
          close();
        }}
      >
        {dialog?.type === "cancel" && (
          <p>
            <strong>{dialog.partner.companyName}</strong> dejará de aparecer en el sitio
            público. Sus datos se conservan y podrás activarla de nuevo más adelante.
          </p>
        )}
      </ConfirmModal>
      <ConfirmModal
        isOpen={dialog?.type === "activate"}
        onClose={close}
        title="Activar suscripción"
        confirmLabel="Activar"
        color="success"
        onConfirm={async () => {
          if (dialog?.type !== "activate") return;
          const resp = await modify<Partner>(
            `${Endpoints.ADMIN_PARTNERS}/${dialog.partner.id}`,
            toFormData({ active: true }),
          );
          if (resp.error) {
            addToast({
              title: "No se pudo activar la suscripción",
              description: resp.message,
              color: "danger",
            });
            return;
          }
          addToast({ title: "Suscripción activada", color: "success" });
          refresh();
          close();
        }}
      >
        {dialog?.type === "activate" && (
          <p>
            <strong>{dialog.partner.companyName}</strong> aparecerá en el sitio público.
            La suscripción inicia hoy y vence en un año.
          </p>
        )}
      </ConfirmModal>
    </>
  );
};
