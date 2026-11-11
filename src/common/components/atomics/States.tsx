import type { ReactNode } from "react";
import { Button } from "@heroui/button";
import { MdErrorOutline, MdInbox, MdRefresh } from "react-icons/md";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  /** Acción opcional (botón o enlace). */
  children?: ReactNode;
}

/** Estado vacío: no hay datos que mostrar todavía. */
export const EmptyState = ({ title, description, icon, children }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-secondary/25 px-4 py-10 text-center">
    <span aria-hidden="true" className="text-4xl text-primary-800">
      {icon ?? <MdInbox />}
    </span>
    <p className="font-semibold text-secondary">{title}</p>
    {description && <p className="max-w-md text-sm text-muted">{description}</p>}
    {children && <div className="mt-2">{children}</div>}
  </div>
);

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

/** Estado de error con opción de reintentar. */
export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <div
    role="alert"
    className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-danger/30 bg-danger-100 px-4 py-8 text-center"
  >
    <MdErrorOutline aria-hidden="true" className="text-4xl text-danger" />
    <p className="font-semibold text-danger-600">No pudimos cargar esta sección</p>
    <p className="max-w-md text-sm text-danger-600">{message}</p>
    {onRetry && (
      <Button
        size="sm"
        color="danger"
        variant="flat"
        className="mt-2"
        startContent={<MdRefresh aria-hidden="true" />}
        onPress={onRetry}
      >
        Reintentar
      </Button>
    )}
  </div>
);
