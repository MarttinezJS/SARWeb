import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { Pagination as Pager } from "@heroui/pagination";
import { MdOutlineNewspaper } from "react-icons/md";
import { EmptyState, Endpoints, ErrorState, SectionHeader } from "../../../common";
import { useApi, useNewsStore } from "../../../hooks";
import type { News, Pagination } from "../../../models";
import { NewsCard, NewsCardSkeleton } from "../components/NewsCard";

const PAGE_SIZE = 12;

export const NewsListPage = () => {
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number.parseInt(params.get("pagina") ?? "1", 10) || 1);
  const { data, error, isLoading, reload } = useApi<Pagination<News>>(
    `${Endpoints.NEWS}?page=${page - 1}&size=${PAGE_SIZE}`,
  );
  const remember = useNewsStore((s) => s.remember);
  useEffect(() => {
    if (data?.results) remember(data.results);
  }, [data, remember]);

  const news = data?.results ?? [];
  const totalPages = Math.max(1, Math.ceil((data?.count ?? 0) / PAGE_SIZE));

  return (
    <>
      <title>Noticias | Sigue Adelante Radio</title>
      <SectionHeader as="h1" eyebrow="Actualidad" title="Noticias">
        {data && <p className="text-sm text-muted">{data.count} publicadas</p>}
      </SectionHeader>

      {error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : isLoading && news.length === 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      ) : news.length === 0 ? (
        <EmptyState
          icon={<MdOutlineNewspaper />}
          title="Todavía no hay noticias"
          description="Vuelve pronto: aquí publicaremos las noticias de la emisora y de Colombia."
        />
      ) : (
        <>
          <div
            className={`grid gap-6 transition-opacity sm:grid-cols-2 lg:grid-cols-3 ${
              isLoading ? "opacity-50" : ""
            }`}
            aria-busy={isLoading}
          >
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pager
                aria-label="Páginas de noticias"
                showControls
                color="secondary"
                total={totalPages}
                page={Math.min(page, totalPages)}
                onChange={(next) => {
                  setParams(next === 1 ? {} : { pagina: String(next) });
                  window.scrollTo(0, 0);
                }}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
