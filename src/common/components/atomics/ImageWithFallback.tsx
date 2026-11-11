import { useState, type ImgHTMLAttributes } from "react";
import { clsx } from "clsx";

interface ImageWithFallbackProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | null;
  alt: string;
}

/**
 * Imagen que, si falta o no carga (muchas vienen de medios externos), muestra
 * el logo de la emisora sobre un fondo de marca en vez de un icono roto.
 */
export const ImageWithFallback = ({ src, alt, className, ...props }: ImageWithFallbackProps) => {
  const [failedSrc, setFailedSrc] = useState<string>();
  if (!src || failedSrc === src) {
    return (
      <div
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={clsx(
          "flex items-center justify-center bg-linear-to-br from-primary-300 to-primary-600",
          className,
        )}
      >
        <img src="/logo.svg" alt="" className="h-1/2 max-h-20 w-1/2 max-w-20 object-contain opacity-70" />
      </div>
    );
  }
  return (
    <img
      loading="lazy"
      decoding="async"
      {...props}
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
};
