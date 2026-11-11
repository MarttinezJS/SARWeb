import { clsx } from "clsx";
import type { Partner } from "../../../models";

interface PartnerLogoProps {
  partner: Pick<Partner, "companyName" | "imageUrl">;
  className?: string;
}

const initials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

/** Logo cuadrado del patrocinador; sin logo, muestra sus iniciales. */
export const PartnerLogo = ({ partner, className }: PartnerLogoProps) => (
  <div
    className={clsx(
      "flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-secondary/10 bg-white p-2",
      className,
    )}
  >
    {partner.imageUrl ? (
      <img
        src={partner.imageUrl}
        alt={`Logo de ${partner.companyName}`}
        loading="lazy"
        className="h-full w-full object-contain"
      />
    ) : (
      <span
        role="img"
        aria-label={partner.companyName}
        className="title text-2xl font-bold text-primary-800"
      >
        {initials(partner.companyName)}
      </span>
    )}
  </div>
);
