import { ReactNode } from "react";

export interface Action<T> {
  icon: ReactNode;
  label: string;
  action: (item: T) => void;
  visibleIf?: (item: T) => boolean;
  color?:
    | "secondary"
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger";
}
