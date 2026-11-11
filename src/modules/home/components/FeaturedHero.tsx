import { Link } from "react-router";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { ImageWithFallback } from "../../../common";
import type { News } from "../../../models";
import { NewsMeta, NewsRow, NewsRowSkeleton } from "../../news/components/NewsCard";

interface FeaturedHeroProps {
  /** Primera noticia en grande; el resto, en la lista de al lado. */
  stories: News[];
  /** true si vienen de /news/featured; si no, son simplemente las más recientes. */
  areFeatured: boolean;
}

export const FeaturedHero = ({ stories, areFeatured }: FeaturedHeroProps) => {
  const [lead, ...rest] = stories;
  if (!lead) return null;
  return (
    <section aria-label={areFeatured ? "Noticias destacadas" : "Noticias más recientes"}>
      <div className="grid gap-6 lg:grid-cols-12">
        <article className="group relative isolate flex min-h-88 flex-col justify-end overflow-hidden rounded-3xl bg-secondary shadow-xl sm:min-h-112 lg:col-span-8">
          <ImageWithFallback
            src={lead.imageUrl}
            alt=""
            loading="eager"
            className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/90 via-black/50 to-black/5" />
          <div className="p-5 sm:p-8">
            <Chip color="primary" size="sm" className="mb-3 font-bold uppercase tracking-wider">
              {areFeatured ? "Destacada" : "Lo más reciente"}
            </Chip>
            <h2 className="title text-2xl font-bold leading-tight text-white sm:text-4xl">
              <Link
                to={`/noticias/${lead.id}`}
                className="after:absolute after:inset-0 hover:underline"
              >
                {lead.title}
              </Link>
            </h2>
            {lead.abstract && (
              <p className="mt-3 line-clamp-2 max-w-2xl text-sm text-white/85 sm:text-base">
                {lead.abstract}
              </p>
            )}
            <NewsMeta
              news={lead}
              className="mt-3 flex flex-wrap items-center gap-x-2 text-xs text-white/80 [&>span:first-child]:text-primary"
            />
          </div>
        </article>

        {rest.length > 0 && (
          <div className="surface flex flex-col gap-4 p-4 lg:col-span-4">
            <p className="eyebrow">{areFeatured ? "También destacadas" : "Más titulares"}</p>
            {rest.map((news) => (
              <NewsRow key={news.id} news={news} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export const FeaturedHeroSkeleton = () => (
  <div className="grid gap-6 lg:grid-cols-12" aria-hidden="true">
    <Skeleton className="min-h-88 rounded-3xl sm:min-h-112 lg:col-span-8" />
    <div className="surface flex flex-col gap-4 p-4 lg:col-span-4">
      {Array.from({ length: 4 }, (_, i) => (
        <NewsRowSkeleton key={i} />
      ))}
    </div>
  </div>
);
