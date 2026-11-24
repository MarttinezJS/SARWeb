import type { ReactNode } from "react";
import { Spinner } from "@heroui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { usePaginated } from "../../../hooks";
import { ErrorState } from "../atomics";
import { ActionButton, PaginationWithSize } from "./atomics";
import type { Action, Column } from "./models";

interface PaginatedTableProps<T> {
  /** Endpoint paginado de la API (`?page=0&size=10`). */
  endpoint: string;
  columns: Column<T>[];
  actions?: Action<T>[];
  /** Nombre accesible de la tabla. */
  "aria-label": string;
  emptyContent?: ReactNode;
  /** Cámbialo (p. ej. un contador) para recargar tras crear o editar. */
  reloadKey?: number;
  initialSize?: number;
}

const ACTIONS = "actions";
const mobileHidden = "hidden md:table-cell";

/** Tabla de HeroUI conectada a un endpoint paginado, con acciones por fila. */
export const PaginatedTable = <T extends { id: number | string }>({
  endpoint,
  columns,
  actions,
  "aria-label": ariaLabel,
  emptyContent = "No hay registros todavía.",
  reloadKey = 0,
  initialSize = 10,
}: PaginatedTableProps<T>) => {
  const { items, count, page, size, setPage, setSize, error, isLoading, reload } =
    usePaginated<T>(endpoint, initialSize, reloadKey);

  if (error) return <ErrorState message={error} onRetry={reload} />;

  const allColumns: Column<T>[] = actions?.length
    ? [...columns, { id: ACTIONS, name: "Acciones", align: "end" }]
    : columns;

  return (
    <div>
      <Table
        aria-label={ariaLabel}
        removeWrapper
        classNames={{
          base: "surface overflow-x-auto p-2",
          th: "bg-content3 text-secondary text-xs uppercase tracking-wide",
          td: "text-secondary align-middle",
        }}
      >
        <TableHeader columns={allColumns}>
          {(column) => (
            <TableColumn
              key={column.id}
              align={column.align ?? "start"}
              className={column.hideOnMobile ? mobileHidden : undefined}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          isLoading={isLoading}
          loadingContent={<Spinner color="secondary" label="Cargando…" />}
          emptyContent={isLoading ? " " : emptyContent}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => {
                const column = allColumns.find((c) => c.id === columnKey);
                const hidden = column?.hideOnMobile ? mobileHidden : undefined;
                if (columnKey === ACTIONS) {
                  return (
                    <TableCell>
                      <div className="flex justify-end gap-0.5">
                        {actions
                          ?.filter((action) => !action.visibleIf || action.visibleIf(item))
                          .map((action) => (
                            <ActionButton
                              key={action.label}
                              action={() => action.action(item)}
                              color={action.color}
                              icon={action.icon}
                              label={action.label}
                              disabled={action.disabled}
                              disabledReason={action.disabledReason}
                            />
                          ))}
                      </div>
                    </TableCell>
                  );
                }
                const value = (item as Record<string, unknown>)[String(columnKey)];
                return (
                  <TableCell className={hidden}>
                    {column?.render ? column.render(item) : String(value ?? "—")}
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PaginationWithSize
        count={count}
        page={page}
        size={size}
        setPage={setPage}
        setSize={setSize}
      />
    </div>
  );
};
