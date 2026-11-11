import { Link } from "react-router";
import { Skeleton } from "@heroui/skeleton";
import { MdOutlineMenuBook } from "react-icons/md";
import { EmptyState, Endpoints, ErrorState, formatDate } from "../../../common";
import { useApi } from "../../../hooks";
import type { Devotional } from "../../../models";

/** Devocional del día (última imagen publicada). */
export const DevotionalCard = () => {
  const { data, error, isLoading, reload } = useApi<Devotional>(Endpoints.DEVOTIONAL_LAST);
  return (
    <section aria-labelledby="devocional-del-dia" className="surface p-5">
      <p className="eyebrow">Palabra para hoy</p>
      <h2 id="devocional-del-dia" className="title mb-3 text-2xl font-bold text-secondary">
        Devocional del día
      </h2>
      {isLoading ? (
        <Skeleton className="aspect-square w-full rounded-xl" />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : data ? (
        <Link to="/devocional" className="group block rounded-xl">
          <img
            src={data.imageUrl}
            alt={`Devocional del ${formatDate(data.createdDate) || "día"}`}
            loading="lazy"
            className="w-full rounded-xl shadow-md transition-transform group-hover:scale-[1.01]"
          />
          <span className="mt-3 flex items-center justify-between gap-2 text-sm">
            <time dateTime={data.createdDate ?? undefined} className="text-muted">
              {formatDate(data.createdDate)}
            </time>
            <span className="font-semibold text-primary-900 group-hover:underline">
              Verlo completo
            </span>
          </span>
        </Link>
      ) : (
        <EmptyState
          icon={<MdOutlineMenuBook />}
          title="Aún no hay devocional"
          description="Pronto compartiremos la reflexión del día."
        />
      )}
    </section>
  );
};
