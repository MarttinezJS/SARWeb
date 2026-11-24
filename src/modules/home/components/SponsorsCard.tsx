import { Link } from "react-router";
import { Skeleton } from "@heroui/skeleton";
import { Endpoints, ErrorState } from "../../../common";
import { useApi } from "../../../hooks";
import type { Partner } from "../../../models";
import { PartnerLogo } from "../../sponsors/components/PartnerLogo";

const MAX_LOGOS = 5;

/** Resumen de patrocinadores activos en el inicio. */
export const SponsorsCard = () => {
  const { data, error, isLoading, reload } = useApi<Partner[]>(Endpoints.PARTNERS_ACTIVE);
  const partners = data ?? [];
  return (
    <section aria-labelledby="patrocinadores-inicio" className="surface p-5">
      <div className="mb-3 flex items-end justify-between gap-2">
        <div>
          <p className="eyebrow">Gracias a</p>
          <h2 id="patrocinadores-inicio" className="title text-2xl font-bold text-secondary">
            Patrocinadores
          </h2>
        </div>
        {partners.length > 0 && (
          <Link
            to="/patrocinadores"
            className="rounded text-sm font-semibold text-primary-900 hover:underline"
          >
            Ver todos
          </Link>
        )}
      </div>
      {isLoading ? (
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="aspect-square rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : (
        <>
          {partners.length === 0 && (
            <p className="mb-3 text-sm text-muted">
              Todavía no hay patrocinadores activos. ¡Tu empresa puede ser la primera!
            </p>
          )}
          <ul className="grid grid-cols-3 gap-3">
            {partners.slice(0, MAX_LOGOS).map((partner) => (
              <li key={partner.id}>
                <PartnerLogo partner={partner} />
              </li>
            ))}
            <li>
              <Link
                to="/patrocinadores#registro"
                className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-secondary/30 p-2 text-center text-xs font-semibold text-primary-900 transition-colors hover:border-primary-700 hover:bg-primary-100"
              >
                Tu marca aquí
              </Link>
            </li>
          </ul>
        </>
      )}
    </section>
  );
};
