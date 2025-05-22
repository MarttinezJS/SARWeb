import { CircularProgress, Image } from "@heroui/react";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { get, getClodinaryUrl } from "../../../../common";
import { Endpoints } from "../../config/endpoints";
import { Partner } from "../../models";
import { SubsBanner } from "./SubsBanner";

const banner = {
  active: false,
  id: "sar",
  imageUrl: "",
  amount: 0,
  subscriptionDate: new Date(),
  expirationDate: new Date(),
  companyName: "",
  contact: "",
  nit: "",
  email: "",
  contactNumber: "",
};

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
        setPartners([banner, ...list]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <div className="flex h-full justify-center items-center">
      <CircularProgress />
    </div>
  ) : (
    <div className=" h-full  ">
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
          {partners.map((partner, i) => {
            return partner.id == "sar" ? (
              <SubsBanner key={partner.id} />
            ) : (
              <div key={i} className="flex justify-center">
                <Image
                  src={getClodinaryUrl(partner.imageUrl)}
                  width={620}
                  height={360}
                />
              </div>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};
