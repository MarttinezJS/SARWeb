import { FcOvertime } from "react-icons/fc";

export const EmptyElement = () => {
  return (
    <div className="grid grid-cols-1 items-center justify-items-center h-full justify-center ">
      <div className="border-primary border-1 drop-shadow-xl bg-yellow-background rounded-2xl h-min p-5">
        <p className="text-3xl text-secondary font-serif font-bold">
          Quédate pendiente!!!
        </p>
        <p className="font-thin text-secondary">
          Muy pronto subiremos contenido
        </p>
        <div className="w-full justify-center flex">
          <FcOvertime className="text-8xl" />
        </div>
      </div>
    </div>
  );
};
