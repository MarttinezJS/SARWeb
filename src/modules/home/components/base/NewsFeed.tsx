import { useCallback, useEffect, useState } from "react";
import { get } from "../../../../common";
import { Pagination } from "../../../../models";
import { News } from "../../models";
import { addToast } from "@heroui/toast";
import { FaRegNewspaper } from "react-icons/fa6";
import { Skeleton } from "@heroui/skeleton";

export const NewsFeed = () => {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getNews = useCallback(async () => {
    const resp = await get<Pagination<News>>("/news");
    if (resp.error) {
      addToast({
        title: resp.message,
        color: "danger",
      });
      return [];
    }
    return resp.body?.results ?? [];
  }, []);
  useEffect(() => {
    getNews().then((resp) => {
      setIsLoading(false);
      setNews(resp);
    });
  }, [getNews]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {isLoading
          ? [1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-50 space-y-5 p-4 bg-foreground/30 rounded-3xl shadow-2xl"
              >
                <Skeleton className="rounded-lg">
                  <div className="h-24 rounded-lg bg-default-300" />
                </Skeleton>
                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                  </Skeleton>
                </div>
              </div>
            ))
          : news.slice(0, 4).map((news) => (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={news.link}
                key={news.id}
              >
                <article className="group cursor-pointer">
                  <div className="rounded-2xl overflow-hidden aspect-4/3 mb-5 shadow-lg relative">
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <span className="text-brand-gold text-xs font-black uppercase tracking-wider">
                    {news.sourceName}
                  </span>
                  <h4 className="text-xl font-bold mt-2 group-hover:text-brand-gold transition-colors leading-tight">
                    {news.title}
                  </h4>
                  <p className="text-primary-800 text-sm mt-3 line-clamp-3">
                    {news.abstract}
                  </p>
                </article>
              </a>
            ))}
      </div>

      <div className="glass-panel py-8">
        <h3 className="text-xl font-bold flex items-center gap-3">
          <FaRegNewspaper />
          Más Titulares
        </h3>
        <div className="space-y-8">
          {news.slice(4).map((news) => (
            <a
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              key={news.id}
            >
              <div className="flex py-1 gap-6 group cursor-pointer items-start">
                <div className="w-28 h-28 rounded-xl overflow-hidden shrink-0 shadow-md">
                  <img
                    src={news.imageUrl}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="grow">
                  <h5 className="font-bold text-lg group-hover:text-brand-gold transition-colors">
                    {news.title}
                  </h5>
                  <p className="text-sm text-primary-700 line-clamp-2">
                    {news.abstract}
                  </p>
                  <span className="text-xs text-primary-700">
                    {new Date(news.createdDate).toLocaleString("es-CO", {
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
