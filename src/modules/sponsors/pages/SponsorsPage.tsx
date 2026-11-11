import { Skeleton } from "@heroui/skeleton";
import { MdOpenInNew, MdOutlineHandshake } from "react-icons/md";
import { EmptyState, Endpoints, ErrorState, SectionHeader } from "../../../common";
import { useApi } from "../../../hooks";
import type { Partner } from "../../../models";
import { PartnerLogo } from "../components/PartnerLogo";
import { PartnerRegisterForm } from "../components/PartnerRegisterForm";

/** Solo se enlazan sitios http(s); se completa el protocolo si falta. */
const toWebUrl = (webSite: string | null | undefined): string | undefined => {
  const value = webSite?.trim();
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  return /^[\w-]+(\.[\w-]+)+/.test(value) ? `https://${value}` : undefined;
};

export const SponsorsPage = () => {
  const { data, error, isLoading, reload } = useApi<Partner[]>(Endpoints.PARTNERS_ACTIVE);
  const partners = data ?? [];

  return (
    <div className="space-y-12">
      <title>Patrocinadores | Sigue Adelante Radio</title>
      <section aria-label="Patrocinadores activos">
        <SectionHeader as="h1" eyebrow="Gracias por su apoyo" title="Nuestros patrocinadores" />
        <p className="mb-6 max-w-3xl text-muted">
          Estas empresas hacen posible que Sigue Adelante Radio lleve el mensaje las
          24 horas. Su aporte sostiene nuestra programación.
        </p>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} className="h-40 rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : partners.length === 0 ? (
          <EmptyState
            icon={<MdOutlineHandshake />}
            title="Aún no hay patrocinadores activos"
            description="Tu empresa puede ser la primera en apoyar a la emisora. Déjanos tus datos más abajo."
          />
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => {
              const url = toWebUrl(partner.webSite);
              return (
                <li key={partner.id} className="surface flex gap-4 p-4">
                  <PartnerLogo partner={partner} className="h-24 w-24 shrink-0" />
                  <div className="min-w-0">
                    <h2 className="title text-xl font-bold leading-tight text-secondary">
                      {partner.companyName}
                    </h2>
                    {partner.about && (
                      <p className="mt-1 line-clamp-4 text-sm text-muted">{partner.about}</p>
                    )}
                    {url && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 rounded text-sm font-semibold text-primary-900 hover:underline"
                      >
                        Visitar sitio web <MdOpenInNew aria-hidden="true" />
                        <span className="sr-only"> (se abre en una pestaña nueva)</span>
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section
        id="registro"
        aria-labelledby="registro-titulo"
        className="scroll-mt-24 overflow-hidden rounded-3xl bg-secondary shadow-xl lg:grid lg:grid-cols-5"
      >
        <div className="p-6 text-secondary-foreground sm:p-8 lg:col-span-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Súmate
          </p>
          <h2 id="registro-titulo" className="title mt-1 text-3xl font-bold">
            Conviértete en patrocinador
          </h2>
          <p className="mt-3 text-sm text-secondary-foreground/85">
            Déjanos los datos de tu empresa y nuestro equipo te contactará para
            contarte las opciones disponibles.
          </p>
          <ol className="mt-5 space-y-2 text-sm text-secondary-foreground/85">
            <li>1. Envías el formulario.</li>
            <li>2. Te llamamos o escribimos para acordar el apoyo.</li>
            <li>3. Tu marca aparece en la web de la emisora.</li>
          </ol>
        </div>
        <div className="bg-white p-6 sm:p-8 lg:col-span-3">
          <PartnerRegisterForm />
        </div>
      </section>
    </div>
  );
};
