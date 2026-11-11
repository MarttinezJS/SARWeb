import { Link, NavLink } from "react-router";
import { clsx } from "clsx";
import { MdOpenInNew } from "react-icons/md";
import { ADMIN_LINKS } from "../adminNavigation";

interface AdminNavProps {
  /** Se llama al elegir un enlace (para cerrar el menú en móvil). */
  onNavigate?: () => void;
}

/** Menú lateral del área de administración (barra fija y cajón móvil). */
export const AdminNav = ({ onNavigate }: AdminNavProps) => (
  <div className="flex h-full flex-col bg-secondary text-secondary-foreground">
    <Link to="/admin" onClick={onNavigate} className="flex items-center gap-3 rounded-lg p-5">
      <img src="/logo.svg" alt="" className="h-10 w-10 rounded-full bg-background p-1" />
      <span className="leading-tight">
        <span className="title block text-lg font-bold uppercase">Sigue Adelante</span>
        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Administración
        </span>
      </span>
    </Link>
    <nav aria-label="Administración" className="grow overflow-y-auto px-3">
      <ul className="space-y-1">
        {ADMIN_LINKS.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.to === "/admin"}
              onClick={onNavigate}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-primary!",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-secondary-foreground/85 hover:bg-white/10",
                )
              }
            >
              <span aria-hidden="true" className="text-xl">
                {link.icon}
              </span>
              <span className="grow">{link.label}</span>
              {link.comingSoon && (
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                  Pronto
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
    <div className="border-t border-white/10 p-3">
      <Link
        to="/"
        onClick={onNavigate}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-secondary-foreground/85 hover:bg-white/10 focus-visible:outline-primary!"
      >
        <MdOpenInNew aria-hidden="true" className="text-xl" />
        Ver el sitio público
      </Link>
    </div>
  </div>
);
