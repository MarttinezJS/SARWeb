export type PromoPlacement = "RADIO" | "POPUP" | "EXPLORAR";

export const PROMO_PLACEMENT_LABELS: Record<PromoPlacement, string> = {
  RADIO: "Destacado en Radio",
  POPUP: "Pop-up al abrir",
  EXPLORAR: "Explorar",
};

export interface Promo {
  id: number;
  /** Sin título ni texto, la app la muestra como imagen sola. */
  title: string | null;
  body: string | null;
  imageUrl: string;
  ctaLabel: string | null;
  ctaUrl: string | null;
  placements: PromoPlacement[];
  startsAt: string;
  endsAt: string;
  priority: number;
  active: boolean;
  createdDate: string;
  updatedAt: string;
}

export type PromoStatus = "vigente" | "programada" | "vencida" | "pausada";

export const promoStatus = (promo: Promo, now = Date.now()): PromoStatus => {
  if (!promo.active) return "pausada";
  if (new Date(promo.startsAt).getTime() > now) return "programada";
  if (new Date(promo.endsAt).getTime() < now) return "vencida";
  return "vigente";
};

export const isImageOnly = (promo: Pick<Promo, "title" | "body">) => !promo.title && !promo.body;
