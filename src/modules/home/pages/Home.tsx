import { Image } from "@heroui/react";
import {
  CarouselNews,
  CarouselPartners,
  DevotionalComponent,
  EventsComponent,
  InformationComponent,
  SongHistory,
} from "../components";
import { NewsModal, VINModal } from "../components/modals";

export const Home = () => {
  // const showVINModal = useVINModalStore((s) => s.showModal);
  // useEffect(() => {
  //   showVINModal();
  // }, []);

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
            <DevotionalComponent />
          </div>
          <div className="border-1 border-primary h-1/2 content-center justify-center grid bg-primary">
            <Image
              src="/logo.svg"
              title="Sigue adelante radio"
              alt="main logo"
              width="300"
            />
          </div>
          <div className="border-1 border-primary h-1/4">
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
      <NewsModal />
      <VINModal />
    </div>
  );
};
