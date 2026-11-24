import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  /** Botones de acción de la vista (crear, etc.). */
  children?: ReactNode;
}

export const AdminPageHeader = ({ title, description, children }: AdminPageHeaderProps) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
    <title>{`${title} | Administración SAR`}</title>
    <div className="min-w-0">
      <h1 className="title text-3xl font-bold text-secondary">{title}</h1>
      {description && <p className="mt-1 max-w-2xl text-sm text-muted">{description}</p>}
    </div>
    {children && <div className="flex flex-wrap gap-2">{children}</div>}
  </div>
);
