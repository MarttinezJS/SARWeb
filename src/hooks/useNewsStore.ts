import { create } from "zustand";
import type { News } from "../models";

interface NewsStoreProps {
  byId: Record<number, News>;
  /** Guarda las noticias ya cargadas para abrir su detalle sin otra petición. */
  remember: (news: News[]) => void;
}

/**
 * La API no tiene `GET /news/:id`: el detalle se arma con las noticias que ya
 * pasaron por alguna lista (inicio, listado, destacadas).
 */
export const useNewsStore = create<NewsStoreProps>((set) => ({
  byId: {},
  remember: (news) =>
    set(({ byId }) => {
      if (news.every((item) => byId[item.id] === item)) return { byId };
      const next = { ...byId };
      for (const item of news) next[item.id] = item;
      return { byId: next };
    }),
}));
