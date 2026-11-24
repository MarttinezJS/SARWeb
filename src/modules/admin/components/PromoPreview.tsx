interface PromoPreviewProps {
  imageUrl?: string | null;
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

/**
 * Vista previa del pop-up tal como lo muestra la app móvil: sin título ni
 * texto, la imagen ocupa toda la pantalla; con texto, aparece una hoja inferior.
 */
export const PromoPreview = ({ imageUrl, title, body, ctaLabel, ctaUrl }: PromoPreviewProps) => {
  const imageOnly = !title?.trim() && !body?.trim();
  const button = ctaUrl?.trim() ? ctaLabel?.trim() || "Ver más" : undefined;
  const image = imageUrl ? (
    <img src={imageUrl} alt="" className="h-full w-full object-cover" />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-primary-200 px-4 text-center text-xs text-muted">
      La imagen aparecerá aquí
    </div>
  );

  return (
    <figure className="flex flex-col items-center gap-2">
      <div className="w-48 rounded-[2rem] bg-[#15110d] p-2 shadow-lg" aria-hidden="true">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.6rem] bg-background">
          {imageOnly ? (
            <>
              <div className="absolute inset-0">{image}</div>
              <span className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-secondary">
                ×
              </span>
              {button && (
                <span className="absolute inset-x-3 bottom-4 rounded-full bg-primary py-2 text-center text-xs font-bold text-secondary">
                  {button}
                </span>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col justify-end bg-black/55">
              <div className="flex flex-col gap-2 rounded-t-2xl bg-background p-3 text-secondary">
                <span className="mx-auto h-1 w-8 rounded-full bg-secondary/30" />
                <div className="aspect-[16/10] overflow-hidden rounded-xl">{image}</div>
                {title?.trim() && (
                  <p className="title text-sm leading-tight font-bold">{title.trim()}</p>
                )}
                {body?.trim() && <p className="line-clamp-4 text-[10px] leading-snug">{body.trim()}</p>}
                {button && (
                  <span className="rounded-full bg-primary py-1.5 text-center text-[11px] font-bold">
                    {button}
                  </span>
                )}
                <span className="text-center text-[10px] text-muted">Ahora no</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <figcaption className="text-xs text-muted">
        {imageOnly ? "Vista en la app: solo imagen" : "Vista en la app: imagen con texto"}
      </figcaption>
    </figure>
  );
};
