import { PRAYER_WHATSAPP_URL, WhatsAppDot } from "../../../common";

/** Peticiones de oración por WhatsApp (barra lateral del inicio). */
export const PrayerCard = () => (
  <section
    id="peticiones-oracion"
    aria-labelledby="peticiones"
    className="surface relative overflow-hidden p-5 after:pointer-events-none after:absolute after:-right-9 after:-top-9 after:size-35 after:rounded-full after:bg-[radial-gradient(circle,rgba(255,196,59,.35),rgba(255,196,59,0)_70%)]"
  >
    <p className="eyebrow">Peticiones de oración</p>
    <h2 id="peticiones" className="title mb-2 text-2xl leading-tight font-bold text-balance text-secondary">
      ¿Cómo podemos orar por ti?
    </h2>
    <p className="text-sm text-muted">
      Escríbenos por WhatsApp tu petición. Nuestro equipo de oración la recibe y ora por ti y por
      tu familia.
    </p>
    <p className="title mt-3 text-[15px] italic text-secondary">
      «Orad unos por otros».
      <cite className="font-funnel mt-0.5 block text-xs font-bold not-italic uppercase tracking-[0.06em] text-primary-800">
        Santiago 5:16
      </cite>
    </p>
    <a
      href={PRAYER_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 flex w-full items-center gap-2.5 rounded-full bg-secondary py-1.5 pl-1.5 pr-4 text-[15px] font-bold text-secondary-foreground transition hover:bg-[#6b3519] active:scale-[0.99]"
    >
      <WhatsAppDot />
      <span className="flex-1 pr-9 text-center">Envía tu petición</span>
    </a>
    <p className="mt-2.5 text-center text-xs text-muted">
      Se abre WhatsApp con el mensaje listo para escribir.
    </p>
  </section>
);
