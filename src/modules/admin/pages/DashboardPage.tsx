import type { ReactNode } from "react";
import { Link } from "react-router";
import { Skeleton } from "@heroui/skeleton";
import {
  MdArrowForward,
  MdOutlineGroup,
  MdOutlineHandshake,
  MdOutlineMarkEmailUnread,
  MdOutlineMenuBook,
  MdOutlineNewspaper,
} from "react-icons/md";
import { Endpoints } from "../../../common";
import { useApi, type ApiState } from "../../../hooks";
import {
  isPartnerRequest,
  type Devotional,
  type News,
  type Pagination,
  type Partner,
  type User,
} from "../../../models";
import { NowPlayingCard } from "../../home/components/NowPlayingCard";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { REQUESTS_PAGE_SIZE } from "../constants";

interface StatCardProps {
  label: string;
  to: string;
  icon: ReactNode;
  state: ApiState<unknown>;
  /** Valor ya calculado (0 si la API respondió sin datos). */
  value: number;
}

const StatCard = ({ label, to, icon, state, value }: StatCardProps) => (
  <Link
    to={to}
    className="surface group flex items-center gap-4 p-4 transition-shadow hover:shadow-md"
  >
    <span
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-2xl text-primary-foreground"
    >
      {icon}
    </span>
    <span className="min-w-0 grow">
      <span className="block text-sm text-muted">{label}</span>
      {state.isLoading ? (
        <Skeleton className="mt-1 h-8 w-16 rounded-lg" />
      ) : state.error ? (
        <span className="block text-sm font-semibold text-danger" title={state.error}>
          No disponible
        </span>
      ) : (
        <span className="title block text-3xl font-bold tabular-nums text-secondary">{value}</span>
      )}
    </span>
    <MdArrowForward
      aria-hidden="true"
      className="shrink-0 text-xl text-muted transition-transform group-hover:translate-x-1"
    />
  </Link>
);

export const DashboardPage = () => {
  const news = useApi<Pagination<News>>(`${Endpoints.NEWS}?page=0&size=1`);
  const activePartners = useApi<Partner[]>(Endpoints.PARTNERS_ACTIVE);
  const devotionals = useApi<Devotional[]>(Endpoints.ADMIN_DEVOTIONAL);
  const users = useApi<Pagination<User>>(`${Endpoints.USERS}?page=0&size=1`);
  const partners = useApi<Pagination<Partner>>(
    `${Endpoints.ADMIN_PARTNERS}?page=0&size=${REQUESTS_PAGE_SIZE}`,
  );
  const requests = (partners.data?.results ?? []).filter(isPartnerRequest).length;

  return (
    <>
      <AdminPageHeader
        title="Panel"
        description="Resumen del contenido publicado y de lo que suena ahora en la emisora."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Noticias"
          to="/admin/noticias"
          icon={<MdOutlineNewspaper />}
          state={news}
          value={news.data?.count ?? 0}
        />
        <StatCard
          label="Patrocinadores activos"
          to="/admin/patrocinadores"
          icon={<MdOutlineHandshake />}
          state={activePartners}
          value={activePartners.data?.length ?? 0}
        />
        <StatCard
          label="Devocionales"
          to="/admin/devocionales"
          icon={<MdOutlineMenuBook />}
          state={devotionals}
          value={devotionals.data?.length ?? 0}
        />
        <StatCard
          label="Usuarios"
          to="/admin/usuarios"
          icon={<MdOutlineGroup />}
          state={users}
          value={users.data?.count ?? 0}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <NowPlayingCard />
        <div className="space-y-6">
          <section aria-labelledby="solicitudes-panel" className="surface p-5">
            <h2 id="solicitudes-panel" className="title text-2xl font-bold text-secondary">
              Solicitudes de patrocinio
            </h2>
            {partners.isLoading ? (
              <Skeleton className="mt-3 h-5 w-2/3 rounded-lg" />
            ) : partners.error ? (
              <p role="alert" className="mt-2 text-sm text-danger">
                {partners.error}
              </p>
            ) : (
              <p className="mt-2 flex items-start gap-2 text-sm text-muted">
                <MdOutlineMarkEmailUnread
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-lg text-primary-800"
                />
                {requests === 0
                  ? "No hay empresas esperando respuesta."
                  : requests === 1
                    ? "1 empresa se registró desde la web y espera respuesta."
                    : `${requests} empresas se registraron desde la web y esperan respuesta.`}
              </p>
            )}
            <Link
              to="/admin/patrocinadores?vista=solicitudes"
              className="mt-3 inline-flex items-center gap-1 rounded text-sm font-semibold text-primary-900 hover:underline"
            >
              Revisar solicitudes <MdArrowForward aria-hidden="true" />
            </Link>
          </section>

          <section aria-labelledby="accesos-panel" className="surface p-5">
            <h2 id="accesos-panel" className="title text-2xl font-bold text-secondary">
              Accesos rápidos
            </h2>
            <ul className="mt-3 space-y-2 text-sm font-semibold text-primary-900">
              <li>
                <Link to="/admin/noticias?nueva=1" className="rounded hover:underline">
                  Publicar una noticia
                </Link>
              </li>
              <li>
                <Link to="/admin/devocionales" className="rounded hover:underline">
                  Subir el devocional de hoy
                </Link>
              </li>
              <li>
                <Link to="/admin/patrocinadores?nuevo=1" className="rounded hover:underline">
                  Registrar un patrocinador
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};
