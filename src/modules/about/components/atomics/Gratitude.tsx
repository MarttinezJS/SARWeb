import { CardFooter, Image } from "@heroui/react";

export const Gratitude = () => {
  return (
    <CardFooter className="lg:absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
      <div className="flex flex-grow gap-2 items-center">
        <Image
          alt="Breathing app icon"
          className="rounded-full w-11 h-11 hidden sm:flex bg-black"
          src="/favicon.png"
        />
        <div className="flex flex-col">
          <p className=" text-white/60">Agradecimientos</p>
          <p className=" text-white/60">
            A la Empresa Cerrejon antes Intercor, por facilitar los estudios de
            Radio Cerrejon, para cumplir con la misión del evangelio del Señor
            Jesucristo durante 21 años.
          </p>
          <p className=" text-white/60">
            Dios bendiga al equipo ministerial, por su apoyo incondicional, en
            la conducción de cada programa.{" "}
          </p>
        </div>
      </div>
    </CardFooter>
  );
};
