import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  /** Nivel del encabezado para mantener la jerarquía del documento. */
  as?: "h1" | "h2" | "h3";
  /** Enlace o acción alineada a la derecha. */
  children?: ReactNode;
}

export const SectionHeader = ({ title, eyebrow, as: Tag = "h2", children }: SectionHeaderProps) => (
  <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-b-2 border-secondary/15 pb-2">
    <div className="min-w-0">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag
        className={
          Tag === "h1"
            ? "title text-3xl font-bold text-secondary sm:text-4xl"
            : "title text-2xl font-bold text-secondary sm:text-3xl"
        }
      >
        {title}
      </Tag>
    </div>
    {children}
  </div>
);
