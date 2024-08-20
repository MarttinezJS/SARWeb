import { Image } from "@nextui-org/react";
import {
  CarouselNews,
  CarouselPartners,
  EventsComponent,
  InformationComponent,
  MainMenu,
  Reproductor,
} from "../components";

export const Home = () => {
  return (
    <div className="lg:h-screen bg-background">
      <div className="lg:columns-3 h-full gap-0">
        <div className="h-full">
          <div className="border-1 border-primary h-1/2 items-center flex">
            <MainMenu />
          </div>
          <div className="border-1 border-primary h-1/2">
            <CarouselNews />
          </div>
        </div>

        <div className="h-full">
          <div className="border-1 border-primary p-10">
            <Reproductor />
          </div>
          <div className="border-1 border-primary content-center justify-center grid bg-primary">
            <Image
              src="/logo.svg"
              title="Sigue adelante radio"
              alt="main logo"
              height="500"
              width="500"
            />
          </div>
          <div className="border-1 border-primary h-1/3">
            <InformationComponent />
          </div>
        </div>

        <div className="h-full">
          <div className="border-1 border-primary h-1/2">
            <CarouselPartners />
          </div>
          <div className="border-1 border-primary h-1/2 overflow-y-scroll">
            <EventsComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
