import { Card, CardHeader, Image } from "@nextui-org/react";
import atardecer from "../../../assets/Atardecer.jpeg";
import { CardBlur, Gratitude, ReviewParagraph } from "../components";

export const About = () => {
  return (
    <div className="py-2 flex justify-center bg-gradient-to-t from-secondary to-background">
      <Card isFooterBlurred className="min-w-min  col-span-12 sm:col-span-7">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Atardecer desde la cabina de sigue adelante radio.
          </p>
          <h4 className="text-white/90 font-medium text-xl">
            Sigue Adelante Radio
          </h4>
        </CardHeader>
        <div className="flex justify-center py-20 absolute z-10">
          <div className="w-10/12 ">
            <div className="flex gap-1 py-2">
              <CardBlur>
                <p>
                  <strong>Misión</strong>
                </p>
                <p>
                  <strong>Sigue Adelante Radio</strong>, en el tiempo será la
                  opción preferida por el pluralismo humano, al contar con
                  Principios y valores de alta definición, en el contexto,
                  espiritual y social.
                </p>
              </CardBlur>
              <CardBlur>
                <p>
                  <strong>Visión</strong>
                </p>
                <p>
                  <strong>Sigue Adelante Radio</strong>, en el tiempo será la
                  opción preferida por el pluralismo humano, al contar con
                  Principios y valores de alta definición, en el contexto,
                  espiritual y social.
                </p>
              </CardBlur>
            </div>
            <CardBlur>
              <ReviewParagraph />
            </CardBlur>
          </div>
        </div>
        <Image
          isBlurred
          src={atardecer}
          className="z-0 w-full h-screen-with-navbar object-cover"
          alt="Atardece en la cabina de sigue adelante radio"
        />
        <Gratitude />
      </Card>
    </div>
  );
};
