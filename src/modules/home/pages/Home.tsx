import { Image } from "@nextui-org/react";
import {
  CarouselNews,
  CarouselPartners,
  EventsComponent,
  InformationComponent,
  SongHistory,
} from "../components";

export const Home = () => {
  return (
    <div className="lg:h-full bg-background">
      <div className="lg:columns-3 h-full gap-0">
        <div className="h-full">
          <div className="border-1 border-primary h-1/2 items-center flex">
            <SongHistory />
          </div>
          <div className="border-1 border-primary h-1/2">
            <CarouselNews />
          </div>
        </div>

        <div className="h-full">
          <div className="border-1 border-primary h-1/4 items-center flex justify-center">
            {/* <Reproductor /> */}
            <InformationComponent />
          </div>
          <div className="border-1 border-primary h-1/2 content-center justify-center grid bg-primary">
            <Image
              src="/logo.svg"
              title="Sigue adelante radio"
              alt="main logo"
              width="300"
            />
          </div>
          <div className="border-1 border-primary h-1/4"></div>
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
