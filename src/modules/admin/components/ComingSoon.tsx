import { Chip } from "@heroui/chip";

/** Marca visible para funciones diseñadas pero aún sin API. */
export const ComingSoonChip = () => (
  <Chip size="sm" variant="flat" color="warning" className="bg-warning-200 font-semibold text-warning-900">
    Próximamente
  </Chip>
);

/** Motivo que se muestra en las acciones deshabilitadas. */
export const NO_API_REASON = "próximamente (la API aún no lo permite)";
