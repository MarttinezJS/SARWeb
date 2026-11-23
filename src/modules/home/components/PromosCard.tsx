import { Endpoints } from "../../../common";
import { useApi } from "../../../hooks";
import { isImageOnly, type Promo } from "../../../models";

const MAX = 2;

/** Promociones vigentes (las mismas del carrusel «Explorar» de la app). */
export const PromosCard = () => {
  const { data } = useApi<Promo[]>(`${Endpoints.PROMOS_ACTIVE}?placement=EXPLORAR`);
  const promos = (data ?? []).slice(0, MAX);
  // Si no hay promociones vigentes la sección no ocupa espacio.
  if (promos.length === 0) return null;

  return (
    <section aria-labelledby="promociones" className="surface p-5">
      <p className="eyebrow">De la emisora</p>
      <h2 id="promociones" className="title mb-3 text-2xl font-bold text-secondary">
        No te lo pierdas
      </h2>
      <ul className="flex flex-col gap-4">
        {promos.map((promo) => {
          const content = (
            <>
              <img
                src={promo.imageUrl}
                alt={promo.title ?? "Promoción de Sigue Adelante Radio"}
                loading="lazy"
                className={
                  isImageOnly(promo)
                    ? "w-full rounded-xl shadow-md"
                    : "aspect-[16/10] w-full rounded-xl object-cover shadow-md"
                }
              />
              {promo.title && (
                <p className="title mt-3 text-lg leading-tight font-bold text-secondary">
                  {promo.title}
                </p>
              )}
              {promo.body && <p className="mt-1 text-sm text-muted">{promo.body}</p>}
              {promo.ctaUrl && (
                <span className="mt-2 inline-block text-sm font-semibold text-primary-900 group-hover:underline">
                  {promo.ctaLabel || "Ver más"}
                </span>
              )}
            </>
          );
          return (
            <li key={promo.id}>
              {promo.ctaUrl ? (
                <a
                  href={promo.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl"
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
