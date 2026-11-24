import { Skeleton } from "@heroui/skeleton";
import { MdOutlineMenuBook } from "react-icons/md";
import { EmptyState, Endpoints, ErrorState, formatDate, SectionHeader } from "../../../common";
import { useApi } from "../../../hooks";
import type { Devotional } from "../../../models";

export const DevotionalPage = () => {
  const { data, error, isLoading, reload } = useApi<Devotional>(Endpoints.DEVOTIONAL_LAST);
  return (
    <div className="mx-auto max-w-2xl">
      <title>Devocional del día | Sigue Adelante Radio</title>
      <SectionHeader as="h1" eyebrow="Palabra para hoy" title="Devocional del día">
        {data?.createdDate && (
          <time dateTime={data.createdDate} className="text-sm text-muted">
            {formatDate(data.createdDate)}
          </time>
        )}
      </SectionHeader>
      {isLoading ? (
        <Skeleton className="aspect-4/5 w-full rounded-2xl" />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : data ? (
        <figure>
          <img
            src={data.imageUrl}
            alt={`Devocional del ${formatDate(data.createdDate) || "día"}`}
            className="w-full rounded-2xl shadow-xl"
          />
          <figcaption className="mt-3 text-center text-sm text-muted">
            Comparte esta reflexión con alguien que la necesite hoy.
          </figcaption>
        </figure>
      ) : (
        <EmptyState
          icon={<MdOutlineMenuBook />}
          title="Aún no hay devocional publicado"
          description="Vuelve más tarde: cada día compartimos una reflexión para acompañarte."
        />
      )}
    </div>
  );
};
