import { clsx } from "clsx";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppDotProps {
  /** sm: enlaces de texto (pie); md: botones. */
  size?: "sm" | "md";
  /** Anillo que se expande para llamar la atención. */
  ring?: boolean;
}

/** Círculo verde de WhatsApp: el único sitio donde aparece su verde. */
export const WhatsAppDot = ({ size = "md", ring = false }: WhatsAppDotProps) => (
  <span
    aria-hidden="true"
    className={clsx(
      "grid flex-none place-items-center rounded-full bg-[#25d366] text-white",
      size === "sm" ? "size-5" : "size-9",
      ring && "wa-ring",
    )}
  >
    <FaWhatsapp className={size === "sm" ? "size-3" : "size-5"} />
  </span>
);
