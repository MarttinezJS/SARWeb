import {
  Accordion,
  AccordionItem,
  Card,
  CardHeader,
  Image,
} from "@heroui/react";
import atardecer from "../../../assets/Atardecer.jpeg";
import { Gratitude, ReviewParagraph } from "../components";

export const About = () => {
  return (
    <div className="py-2 flex sm:h-screen-with-navbar sm:min-h-min min-h-screen bg-[url('/Atardecer.jpeg')] justify-center sm:bg-gradient-to-t from-secondary to-background">
      <Card
        isFooterBlurred
        shadow="none"
        className="lg:min-w-min  bg-transparent col-span-12 sm:col-span-7"
      >
        <CardHeader className="lg:absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Atardecer desde la cabina de sigue adelante radio.
          </p>
          <h4 className="text-white/90 font-medium text-xl">
            Sigue Adelante Radio
          </h4>
        </CardHeader>
        <div className="flex justify-center lg:py-20  lg:absolute w-full z-10">
          <div className="flex gap-1 py-2 w-full p-2  sm:w-10/12">
            <Accordion
              className="backdrop-blur-xl bg-black/40 text-white"
              isCompact
              fullWidth
              variant="shadow"
              motionProps={{
                variants: {
                  enter: {
                    y: 0,
                    opacity: 1,
                    height: "auto",
                    transition: {
                      height: {
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        duration: 1,
                      },
                      opacity: {
                        easings: "ease",
                        duration: 1,
                      },
                    },
                  },
                  exit: {
                    y: -10,
                    opacity: 0,
                    height: 0,
                    transition: {
                      height: {
                        easings: "ease",
                        duration: 0.25,
                      },
                      opacity: {
                        easings: "ease",
                        duration: 0.3,
                      },
                    },
                  },
                },
              }}
            >
              <AccordionItem
                key="1"
                aria-label="Misión"
                title={<p className="text-white">Misión</p>}
              >
                <p className="text-justify">
                  <strong>Sigue Adelante Radio</strong>, en el tiempo será la
                  opción preferida por el pluralismo humano, al contar con
                  Principios y valores de alta definición, en el contexto,
                  espiritual y social.
                </p>
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Visión"
                title={<p className="text-white">Visión</p>}
              >
                <p className="text-justify">
                  <strong>Sigue Adelante Radio</strong>, en el tiempo será la
                  opción preferida por el pluralismo humano, al contar con
                  Principios y valores de alta definición, en el contexto,
                  espiritual y social.
                </p>
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Reseña Histórica"
                title={<p className="text-white">Reseña Histórica</p>}
              >
                <ReviewParagraph />
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <Image
          isBlurred
          src={atardecer}
          className="z-0 w-full h-screen-with-navbar hidden sm:flex absolute lg:relative object-cover"
          alt="Atardece en la cabina de sigue adelante radio"
        />
        <Gratitude />
      </Card>
    </div>
  );
};
