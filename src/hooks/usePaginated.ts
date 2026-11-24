import { useState } from "react";
import type { Pagination } from "../models";
import { useApi } from "./useApi";

/**
 * Listado paginado de la API (`?page=0&size=10`). La página que expone el
 * hook empieza en 1, como la muestran los controles de paginación.
 */
export const usePaginated = <T>(
  endpoint: string,
  initialSize = 10,
  refreshKey: string | number = 0,
) => {
  const [page, setPage] = useState(1);
  const [size, setSizeState] = useState(initialSize);
  const separator = endpoint.includes("?") ? "&" : "?";
  const { data, error, isLoading, reload } = useApi<Pagination<T>>(
    `${endpoint}${separator}page=${page - 1}&size=${size}`,
    refreshKey,
  );
  const count = data?.count ?? 0;

  return {
    items: data?.results ?? [],
    count,
    totalPages: Math.max(1, Math.ceil(count / size)),
    page,
    size,
    setPage,
    setSize: (value: number) => {
      setSizeState(value);
      setPage(1);
    },
    error,
    isLoading,
    /** true solo en la primera carga (aún no hay datos que mostrar). */
    isFirstLoad: isLoading && data === undefined,
    reload,
  };
};
