import type { ReactNode } from "react";

export interface Column<T> {
  /** Clave de la columna: una propiedad de la fila o un id propio con `render`. */
  id: (keyof T & string) | (string & {});
  name: string;
  /** Contenido de la celda; por defecto muestra `item[id]` como texto. */
  render?: (item: T) => ReactNode;
  /** Oculta la columna en móvil para que la tabla quepa sin desbordar. */
  hideOnMobile?: boolean;
  align?: "start" | "center" | "end";
}
