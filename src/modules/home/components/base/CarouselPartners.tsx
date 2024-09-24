import { CircularProgress } from "@nextui-org/react";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { get } from "../../../../common";
import { Endpoints } from "../../config/endpoints";
import { Partner } from "../../models";
import { PartnerCard } from "../atomics";
import { SubsBanner } from "./SubsBanner";

export const CarouselPartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    get<Partner[]>(`${Endpoints.PARTNERS}/active`)
      .then((resp) => {
        const list = resp.body;
        if (resp.error || !list) {
          return;
        }
        setPartners(list);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <div className="flex h-full justify-center items-center">
      <CircularProgress />
    </div>
  ) : (
    <div className="p-10 h-full  ">
      <div className="text-2xl font-bold text-center text-secondary w-full text-wrap">
        Banner de nuestros anunciadores
      </div>
      {partners.length == 0 ? (
        <SubsBanner />
      ) : (
        <Carousel
          infiniteLoop
          autoPlay
          stopOnHover
          showThumbs={false}
          className="flex items-center h-full"
        >
          <SubsBanner />
          <PartnerCard partners={partners} />
        </Carousel>
      )}
    </div>
  );
};
