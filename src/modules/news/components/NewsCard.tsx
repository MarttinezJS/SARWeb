import { Link } from "react-router";
import { Skeleton } from "@heroui/skeleton";
import { formatShortDate, ImageWithFallback } from "../../../common";
import type { News } from "../../../models";

/** Fuente y fecha de una noticia, en una sola línea. */
export const NewsMeta = ({ news, className }: { news: News; className?: string }) => (
  <p className={className ?? "flex flex-wrap items-center gap-x-2 text-xs text-muted"}>
    <span className="font-bold uppercase tracking-wide text-primary-800">{news.sourceName}</span>
    {news.createdDate && (
      <>
        <span aria-hidden="true">·</span>
        <time dateTime={news.createdDate}>{formatShortDate(news.createdDate)}</time>
      </>
    )}
  </p>
);

/** Tarjeta vertical de noticia: imagen, fuente, título y resumen. */
export const NewsCard = ({ news }: { news: News }) => (
  <article className="surface group relative flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
    <div className="aspect-video overflow-hidden">
      <ImageWithFallback
        src={news.imageUrl}
        alt=""
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="flex grow flex-col gap-2 p-4">
      <NewsMeta news={news} />
      <h3 className="title text-xl font-bold leading-snug text-secondary">
        {/* El enlace cubre toda la tarjeta para que sea fácil de tocar. */}
        <Link to={`/noticias/${news.id}`} className="after:absolute after:inset-0 hover:underline">
          {news.title}
        </Link>
      </h3>
      {news.abstract && <p className="line-clamp-3 text-sm text-muted">{news.abstract}</p>}
    </div>
  </article>
);

/** Fila compacta de noticia para listas laterales. */
export const NewsRow = ({ news }: { news: News }) => (
  <article className="group relative flex items-start gap-3">
    <ImageWithFallback
      src={news.imageUrl}
      alt=""
      className="h-20 w-24 shrink-0 rounded-xl object-cover"
    />
    <div className="min-w-0">
      <NewsMeta news={news} />
      <h3 className="title line-clamp-3 text-base font-bold leading-snug text-secondary">
        <Link to={`/noticias/${news.id}`} className="after:absolute after:inset-0 hover:underline">
          {news.title}
        </Link>
      </h3>
    </div>
  </article>
);

export const NewsCardSkeleton = () => (
  <div className="surface overflow-hidden" aria-hidden="true">
    <Skeleton className="aspect-video w-full" />
    <div className="space-y-3 p-4">
      <Skeleton className="h-3 w-1/3 rounded-lg" />
      <Skeleton className="h-5 w-full rounded-lg" />
      <Skeleton className="h-5 w-4/5 rounded-lg" />
      <Skeleton className="h-3 w-full rounded-lg" />
    </div>
  </div>
);

export const NewsRowSkeleton = () => (
  <div className="flex items-start gap-3" aria-hidden="true">
    <Skeleton className="h-20 w-24 shrink-0 rounded-xl" />
    <div className="w-full space-y-2">
      <Skeleton className="h-3 w-1/3 rounded-lg" />
      <Skeleton className="h-4 w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4 rounded-lg" />
    </div>
  </div>
);
