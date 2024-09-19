import { CircularProgress, Image } from "@nextui-org/react";
import { Carousel } from "react-responsive-carousel";
import { EmptyElement } from "../atomics";
import { useEffect, useState } from "react";
import { get, getClodinaryUrl } from "../../../../common";
import { Endpoints } from "../../config/endpoints";
import { useResponseModalStore } from "../../../../hooks";
import { Partner } from "../../models";

export const CarouselPartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const showResp = useResponseModalStore((s) => s.showModal);
  useEffect(() => {
    get<Partner[]>(Endpoints.PARTNERS).then((resp) => {
      const list = resp.body;
      if (resp.error || !list) {
        showResp(resp);
        return;
      }
      setPartners(list);
      setIsLoading(false);
    });
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
      {partners.length > 0 ? (
        <Carousel
          infiniteLoop
          autoPlay
          stopOnHover
          showThumbs={false}
          className="flex items-center h-full"
        >
          {partners.map((partner, i) => (
            <Image
              key={i}
              src={getClodinaryUrl(partner.imageUrl)}
              width={500}
            />
          ))}
        </Carousel>
      ) : (
        <EmptyElement />
      )}
    </div>
  );
};
