import { clsx } from "clsx";
import { PRAYER_WHATSAPP_URL } from "../../constants";
import { WhatsAppDot } from "../atomics";

/**
 * Botón flotante para enviar peticiones de oración por WhatsApp. Va encima del
 * reproductor y baja a ocupar su lugar cuando este se esconde (sonando).
 */
export const PrayerFab = ({ playerCollapsed }: { playerCollapsed: boolean }) => (
  <a
    href={PRAYER_WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Envía tu petición de oración por WhatsApp"
    className={clsx(
      "fixed right-4 z-49 flex items-center gap-2.5 rounded-full border border-primary/35 bg-secondary/95 py-1.5 pl-1.5 pr-4.5 text-sm leading-tight font-bold text-secondary-foreground shadow-xl backdrop-blur-xl transition-[bottom,transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-secondary active:translate-y-0 lg:right-8",
      playerCollapsed ? "bottom-6" : "bottom-28",
    )}
  >
    <WhatsAppDot ring />
    <span>
      Envía tu petición
      <small className="block text-[11px] font-medium text-primary-300">por WhatsApp</small>
    </span>
  </a>
);
