import { createBrowserRouter, RouterProvider } from "react-router";
import { Spinner } from "@heroui/spinner";
import { Layout } from "./common";
import {
  DevotionalPage,
  HomePage,
  LoginPage,
  NewsDetailPage,
  NewsListPage,
  NotFoundPage,
  Policy,
  SponsorsPage,
} from "./modules";

// El área de administración se descarga aparte, solo cuando se visita.
const admin = () => import("./modules/admin");

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "noticias", Component: NewsListPage },
      { path: "noticias/:id", Component: NewsDetailPage },
      { path: "patrocinadores", Component: SponsorsPage },
      { path: "devocional", Component: DevotionalPage },
      { path: "policy", Component: Policy },
      { path: "login", Component: LoginPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
  {
    // Protegida en el cliente por AdminLayout (solo rol ADMIN).
    path: "/admin",
    lazy: async () => ({ Component: (await admin()).AdminLayout }),
    HydrateFallback: () => (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner color="secondary" label="Cargando…" />
      </div>
    ),
    children: [
      { index: true, lazy: async () => ({ Component: (await admin()).DashboardPage }) },
      { path: "noticias", lazy: async () => ({ Component: (await admin()).AdminNewsPage }) },
      {
        path: "patrocinadores",
        lazy: async () => ({ Component: (await admin()).AdminPartnersPage }),
      },
      {
        path: "devocionales",
        lazy: async () => ({ Component: (await admin()).AdminDevotionalsPage }),
      },
      { path: "usuarios", lazy: async () => ({ Component: (await admin()).AdminUsersPage }) },
      { path: "eventos", lazy: async () => ({ Component: (await admin()).AdminEventsPage }) },
      { path: "*", lazy: async () => ({ Component: (await admin()).DashboardPage }) },
    ],
  },
]);

export const Routes = () => <RouterProvider router={router} />;
