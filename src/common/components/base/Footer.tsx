import { Link } from "react-router";
import { PUBLIC_LINKS } from "./navigation";

export const Footer = () => {
  return (
    // El relleno inferior deja sitio al reproductor flotante.
    <footer className="mt-12 bg-secondary px-4 pb-32 pt-10 text-secondary-foreground sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="" className="h-12 w-12 rounded-full bg-background p-1.5" />
            <p className="title text-xl font-bold uppercase tracking-tight">
              Sigue Adelante <span className="text-primary">Radio</span>
            </p>
          </div>
          <p className="mt-3 max-w-md text-sm text-secondary-foreground/80">
            Emisora cristiana de Valledupar, Colombia. Mensajes bíblicos, música,
            noticias y devocionales las 24 horas, los 7 días de la semana.
          </p>
        </div>

        <nav aria-label="Secciones del sitio">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Secciones
          </p>
          <ul className="space-y-2 text-sm">
            {PUBLIC_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="rounded hover:text-primary hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Enlaces de la emisora">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            La emisora
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/patrocinadores#registro" className="rounded hover:text-primary hover:underline">
                Quiero ser patrocinador
              </Link>
            </li>
            <li>
              <Link to="/policy" className="rounded hover:text-primary hover:underline">
                Políticas de privacidad
              </Link>
            </li>
            <li>
              <Link to="/login" className="rounded hover:text-primary hover:underline">
                Acceso del equipo
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-7xl border-t border-secondary-foreground/15 pt-5 text-xs text-secondary-foreground/70">
        &copy; {new Date().getFullYear()} Sigue Adelante Radio. Todos los derechos reservados.
      </p>
    </footer>
  );
};
