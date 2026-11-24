import { Chip } from "@heroui/chip";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { MdOutlineEvent } from "react-icons/md";
import { EVENT_STATUS_LABELS, type EventStatus } from "../../../models";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { ComingSoonChip } from "../components/ComingSoon";

// Clases con contraste suficiente sobre el fondo crema.
const STATUS_CLASSES: Record<EventStatus, string> = {
  PROGRAMADO: "bg-primary-200 text-primary-900",
  EN_PROCESO: "bg-warning-200 text-warning-900",
  REALIZADO: "bg-success-300 text-success-800",
  REPROGRAMADO: "bg-secondary/15 text-secondary",
  CANCELADO: "bg-danger-200 text-danger-600",
};

const fieldClasses = { label: "font-medium text-secondary!", inputWrapper: "bg-white" };

/**
 * Vista "Próximamente": la tabla `Eventos` existe en la base, pero la API aún
 * no tiene rutas para listarlos ni gestionarlos. El formulario es solo una
 * vista previa deshabilitada del diseño; no guarda ni muestra datos.
 */
export const AdminEventsPage = () => (
  <>
    <AdminPageHeader
      title="Eventos"
      description="Agenda de actividades de la emisora: campañas, conciertos, vigilias y más."
    >
      <ComingSoonChip />
    </AdminPageHeader>

    <div
      role="status"
      className="mb-6 flex items-start gap-3 rounded-2xl border border-warning-700/40 bg-warning-100 p-4 text-warning-900"
    >
      <MdOutlineEvent aria-hidden="true" className="mt-0.5 shrink-0 text-2xl" />
      <div>
        <p className="font-semibold">Esta sección aún no está disponible</p>
        <p className="text-sm">
          El servidor todavía no ofrece la API de eventos. Cuando exista, aquí podrás
          crear, reprogramar y cancelar eventos. Lo de abajo es una vista previa del
          diseño y no guarda información.
        </p>
      </div>
    </div>

    <div className="grid gap-6 lg:grid-cols-5">
      <section aria-labelledby="evento-preview" className="surface p-5 lg:col-span-3">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 id="evento-preview" className="title text-2xl font-bold text-secondary">
            Nuevo evento
          </h2>
          <ComingSoonChip />
        </div>
        <fieldset disabled className="space-y-5">
          <legend className="sr-only">Vista previa deshabilitada del formulario de eventos</legend>
          <Input
            isDisabled
            label="Título"
            labelPlacement="outside-top"
            variant="bordered"
            classNames={fieldClasses}
          />
          <Textarea
            isDisabled
            label="Descripción"
            labelPlacement="outside-top"
            variant="bordered"
            minRows={3}
            classNames={fieldClasses}
          />
          <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
            <Input
              isDisabled
              type="datetime-local"
              label="Fecha programada"
              labelPlacement="outside-top"
              variant="bordered"
              classNames={fieldClasses}
            />
            <Input
              isDisabled
              type="number"
              label="Duración (días)"
              labelPlacement="outside-top"
              variant="bordered"
              classNames={fieldClasses}
            />
          </div>
          <div className="flex justify-end">
            <Button isDisabled color="secondary">
              Guardar evento
            </Button>
          </div>
        </fieldset>
      </section>

      <section aria-labelledby="estados-evento" className="surface p-5 lg:col-span-2 lg:self-start">
        <h2 id="estados-evento" className="title mb-2 text-2xl font-bold text-secondary">
          Estados previstos
        </h2>
        <p className="mb-4 text-sm text-muted">
          Cada evento tendrá uno de estos estados para que la audiencia sepa si sigue en pie.
        </p>
        <ul className="flex flex-wrap gap-2">
          {(Object.keys(EVENT_STATUS_LABELS) as EventStatus[]).map((status) => (
            <li key={status}>
              <Chip variant="flat" className={STATUS_CLASSES[status]}>
                {EVENT_STATUS_LABELS[status]}
              </Chip>
            </li>
          ))}
        </ul>
      </section>
    </div>
  </>
);
