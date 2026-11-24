import { Link, useParams } from "react-router";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import { MdArrowBack, MdOpenInNew, MdSearchOff } from "react-icons/md";
import { EmptyState, ErrorState, formatDate, ImageWithFallback } from "../../../common";
import { isEditorial } from "../../../models";
import { useNewsDetail } from "../hooks/useNewsDetail";

const BackLink = () => (
  <Link
    to="/noticias"
    className="mb-4 inline-flex items-center gap-1 rounded text-sm font-semibold text-primary-900 hover:underline"
  >
    <MdArrowBack aria-hidden="true" /> Todas las noticias
  </Link>
);

export const NewsDetailPage = () => {
  const { id } = useParams();
  const { news, status, message } = useNewsDetail(Number.parseInt(id ?? "", 10));

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-3xl space-y-4" aria-busy="true" aria-label="Cargando noticia">
        <Skeleton className="h-4 w-40 rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-2/3 rounded-lg" />
        <Skeleton className="aspect-video w-full rounded-2xl" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-5/6 rounded-lg" />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="mx-auto max-w-3xl">
        <BackLink />
        {status === "error" ? (
          <ErrorState message={message ?? "No se pudo cargar la noticia."} />
        ) : (
          <EmptyState
            icon={<MdSearchOff />}
            title="No encontramos esta noticia"
            description="Puede que el enlace sea antiguo. Mira las noticias más recientes."
          >
            <Button as={Link} to="/noticias" color="secondary">
              Ver noticias
            </Button>
          </EmptyState>
        )}
      </div>
    );
  }

  const editorial = isEditorial(news);

  return (
    <article className="mx-auto max-w-3xl">
      <title>{`${news.title} | Sigue Adelante Radio`}</title>
      <BackLink />
      <header>
        <p className="flex flex-wrap items-center gap-2 text-sm">
          {news.sourceIcon && (
            <img src={news.sourceIcon} alt="" className="h-5 w-5 rounded-full object-cover" />
          )}
          <span className="eyebrow">{news.sourceName}</span>
          {news.createdDate && (
            <>
              <span aria-hidden="true" className="text-muted">
                ·
              </span>
              <time dateTime={news.createdDate} className="text-muted">
                {formatDate(news.createdDate)}
              </time>
            </>
          )}
        </p>
        <h1 className="title mt-2 text-3xl font-bold leading-tight text-secondary sm:text-5xl">
          {news.title}
        </h1>
        {news.abstract && (
          <p className="mt-4 text-lg leading-relaxed text-muted">{news.abstract}</p>
        )}
      </header>

      <ImageWithFallback
        src={news.imageUrl}
        alt=""
        className="mt-6 aspect-video w-full rounded-2xl object-cover shadow-md"
      />

      {news.text && (
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-secondary">
          {news.text
            .split(/\n+/)
            .filter((paragraph) => paragraph.trim())
            .map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
        </div>
      )}

      {!editorial && news.link && (
        <aside className="surface mt-8 flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            Esta noticia fue publicada por <strong>{news.sourceName}</strong>. Lee el
            artículo completo en su sitio.
          </p>
          <Button
            as="a"
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            color="secondary"
            className="shrink-0"
            endContent={<MdOpenInNew aria-hidden="true" />}
          >
            Leer en {news.sourceName}
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </Button>
        </aside>
      )}
    </article>
  );
};
