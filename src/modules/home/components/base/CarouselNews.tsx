import { Carousel } from "react-responsive-carousel";
import { CardNews } from "./CardNews";
import { EmptyElement } from "../atomics";
import { useEffect, useState } from "react";
import { get } from "../../../../common";
import { Endpoints } from "../../config/endpoints";
import { New } from "../../models";
import { Pagination } from "../../../../models";
import { CircularProgress } from "@nextui-org/react";

export const CarouselNews = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState<New[]>([]);
  useEffect(() => {
    setIsLoading(true);
    get<Pagination<New>>(`${Endpoints.NEWS}?page=0&size=10`)
      .then((resp) => {
        const list = resp.body?.results;
        if (resp.error || !list) {
          return;
        }
        setNews(list);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <div className="flex justify-center items-center h-full">
      <CircularProgress />
    </div>
  ) : news.length > 0 ? (
    <Carousel
      infiniteLoop
      autoPlay
      stopOnHover
      showThumbs={false}
      className="flex items-center"
    >
      {news.map((value, i) => (
        <div className="flex justify-center" key={i}>
          <CardNews new={value} />
        </div>
      ))}
    </Carousel>
  ) : (
    <EmptyElement />
  );
};
