/** Estados de la tabla `Eventos` (todavía sin API). */
export type EventStatus =
  | "PROGRAMADO"
  | "EN_PROCESO"
  | "REALIZADO"
  | "REPROGRAMADO"
  | "CANCELADO";

export const EVENT_STATUS_LABELS: Record<EventStatus, string> = {
  PROGRAMADO: "Programado",
  EN_PROCESO: "En proceso",
  REALIZADO: "Realizado",
  REPROGRAMADO: "Reprogramado",
  CANCELADO: "Cancelado",
};
