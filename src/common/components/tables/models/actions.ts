import type { ReactNode } from "react";

export interface Action<T> {
  icon: ReactNode;
  label: string;
  action: (item: T) => void | Promise<void>;
  visibleIf?: (item: T) => boolean;
  /** Acción visible pero deshabilitada (p. ej. sin API todavía). */
  disabled?: boolean;
  /** Texto del tooltip cuando está deshabilitada. */
  disabledReason?: string;
  color?: "secondary" | "default" | "primary" | "success" | "warning" | "danger";
}
