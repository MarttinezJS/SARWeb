import { Image } from "@nextui-org/react";
import { Carousel } from "react-responsive-carousel";
import { EmptyElement } from "../atomics";

const partners: string[] = [
  // "https://1000marcas.net/wp-content/uploads/2020/01/Logo-Mazda.png",
  // "https://1000marcas.net/wp-content/uploads/2020/01/logo-Sony.png",
  // "https://www.hatchwise.com/wp-content/uploads/2023/08/playstation-logo-1024x576.png",
];

const CarouselPartners = () => {
  return (
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
          {partners.map((logo, i) => (
            <Image key={i} src={logo} width={500} />
          ))}
        </Carousel>
      ) : (
        <EmptyElement />
      )}
    </div>
  );
};

export default CarouselPartners;
