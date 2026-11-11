import { useEffect } from "react";
import { Link } from "react-router";
import { Button } from "@heroui/button";
import { MdArrowForward, MdOutlineNewspaper } from "react-icons/md";
import { EmptyState, Endpoints, ErrorState, SectionHeader } from "../../../common";
import { useApi, useNewsStore } from "../../../hooks";
import type { News, Pagination } from "../../../models";
import { NewsCard, NewsCardSkeleton } from "../../news/components/NewsCard";
import { DevotionalCard } from "../components/DevotionalCard";
import { FeaturedHero, FeaturedHeroSkeleton } from "../components/FeaturedHero";
import { NowPlayingCard } from "../components/NowPlayingCard";
import { SponsorsCard } from "../components/SponsorsCard";

const HERO_SIZE = 5;
const LATEST_SIZE = 6;

export const HomePage = () => {
  const featured = useApi<News[]>(Endpoints.NEWS_FEATURED);
  const latest = useApi<Pagination<News>>(
    `${Endpoints.NEWS}?page=0&size=${HERO_SIZE + LATEST_SIZE}`,
  );
  const remember = useNewsStore((s) => s.remember);
  useEffect(() => {
    remember([...(featured.data ?? []), ...(latest.data?.results ?? [])]);
  }, [featured.data, latest.data, remember]);

  const isLoading = featured.isLoading || latest.isLoading;
  const featuredNews = (featured.data ?? []).slice(0, HERO_SIZE);
  const latestNews = latest.data?.results ?? [];
  // Sin destacadas, el hero muestra las noticias más recientes.
  const areFeatured = featuredNews.length > 0;
  const heroStories = areFeatured ? featuredNews : latestNews.slice(0, HERO_SIZE);
  const heroIds = new Set(heroStories.map((news) => news.id));
  const moreNews = latestNews.filter((news) => !heroIds.has(news.id)).slice(0, LATEST_SIZE);

  return (
    <div className="space-y-10">
      <title>Sigue Adelante Radio | Emisora cristiana de Valledupar</title>
      <h1 className="sr-only">Sigue Adelante Radio</h1>

      {isLoading ? (
        <FeaturedHeroSkeleton />
      ) : heroStories.length > 0 ? (
        <FeaturedHero stories={heroStories} areFeatured={areFeatured} />
      ) : latest.error ? (
        <ErrorState message={latest.error} onRetry={latest.reload} />
      ) : (
        <EmptyState
          icon={<MdOutlineNewspaper />}
          title="Todavía no hay noticias"
          description="Mientras tanto, acompáñanos en vivo con el reproductor."
        />
      )}

      <div className="grid gap-8 lg:grid-cols-12">
        <section aria-label="Últimas noticias" className="lg:col-span-8">
          <SectionHeader eyebrow="Actualidad" title="Últimas noticias">
            <Link
              to="/noticias"
              className="rounded text-sm font-semibold text-primary-900 hover:underline"
              aria-label="Ver todas las noticias"
            >
              Ver todas
            </Link>
          </SectionHeader>
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {Array.from({ length: 4 }, (_, i) => (
                <NewsCardSkeleton key={i} />
              ))}
            </div>
          ) : latest.error ? (
            <ErrorState message={latest.error} onRetry={latest.reload} />
          ) : moreNews.length === 0 ? (
            <EmptyState
              icon={<MdOutlineNewspaper />}
              title="No hay más noticias por ahora"
              description="Cuando publiquemos nuevas noticias aparecerán aquí."
            />
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                {moreNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  as={Link}
                  to="/noticias"
                  color="secondary"
                  variant="bordered"
                  endContent={<MdArrowForward aria-hidden="true" />}
                >
                  Más noticias
                </Button>
              </div>
            </>
          )}
        </section>

        <aside className="space-y-6 lg:col-span-4" aria-label="La emisora">
          <NowPlayingCard />
          <DevotionalCard />
          <SponsorsCard />
        </aside>
      </div>
    </div>
  );
};
