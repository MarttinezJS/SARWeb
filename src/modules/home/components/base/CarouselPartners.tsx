import { Card, CircularProgress, Image } from "@nextui-org/react";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { get, getClodinaryUrl } from "../../../../common";
import { Endpoints } from "../../config/endpoints";
import { Partner } from "../../models";
import { FaHandPointer } from "react-icons/fa";

export const CarouselPartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    get<Partner[]>(Endpoints.PARTNERS)
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

      <Carousel
        infiniteLoop
        autoPlay
        stopOnHover
        showThumbs={false}
        className="flex items-center h-full"
      >
        <div className="w-full flex justify-center">
          <Card shadow="none" isPressable className="bg-yellow-background">
            <div className="flex m-2 items-center justify-between">
              <p className="font-serif">Mas información</p>
              <FaHandPointer className="text-secondary" />
            </div>
            <Image src={"/plan-70.jpeg"} height={300} />
          </Card>
        </div>
        <>
          {partners.map((partner, i) => (
            <Image
              key={i}
              src={getClodinaryUrl(partner.imageUrl)}
              width={500}
            />
          ))}
        </>
      </Carousel>
    </div>
  );
};
