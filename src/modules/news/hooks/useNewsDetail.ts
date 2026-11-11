import { useEffect, useState } from "react";
import { Endpoints, get } from "../../../common";
import { useNewsStore } from "../../../hooks";
import type { News, Pagination } from "../../../models";

// Búsqueda de respaldo cuando se abre el enlace directo de una noticia:
// se recorren como máximo MAX_PAGES páginas de PAGE_SIZE noticias.
const PAGE_SIZE = 50;
const MAX_PAGES = 6;

type Missing = { id: number; status: "notfound" | "error"; message?: string };

/**
 * Detalle de una noticia. La API no tiene `GET /news/:id`, así que primero se
 * usa lo ya cargado en las listas y, si no está (enlace directo o recarga),
 * se busca en las páginas más recientes del listado.
 */
export const useNewsDetail = (id: number) => {
  const cached = useNewsStore((s) => (Number.isNaN(id) ? undefined : s.byId[id]));
  const remember = useNewsStore((s) => s.remember);
  const [missing, setMissing] = useState<Missing>();

  useEffect(() => {
    if (cached || Number.isNaN(id)) return;
    let cancelled = false;
    (async () => {
      for (let page = 0; page < MAX_PAGES; page++) {
        const resp = await get<Pagination<News>>(
          `${Endpoints.NEWS}?page=${page}&size=${PAGE_SIZE}`,
        );
        if (cancelled) return;
        if (resp.error || !resp.body) {
          setMissing({ id, status: "error", message: resp.message });
          return;
        }
        remember(resp.body.results);
        if (resp.body.results.some((item) => item.id === id)) return;
        if (resp.body.next === null || resp.body.next === undefined) break;
      }
      setMissing({ id, status: "notfound" });
    })();
    return () => {
      cancelled = true;
    };
  }, [id, cached, remember]);

  if (cached) return { news: cached, status: "ready" as const };
  if (Number.isNaN(id)) return { news: undefined, status: "notfound" as const };
  if (missing?.id === id) return { news: undefined, status: missing.status, message: missing.message };
  return { news: undefined, status: "loading" as const };
};
