// Rutas del gateway (api.sigueadelanteradio.com): sin prefijo de servicio.
export const Endpoints = {
  // Autenticación y usuarios
  SIGN_UP: "/sign-up",
  LOGIN: "/login",
  USERS: "/users",
  SESSION: "/users/token",
  // Radio
  POINTS: "/stream/points",
  NOW_PLAYING: "/azura/now-playing",
  HISTORY: "/azura/history",
  // Contenido público
  NEWS: "/news",
  NEWS_FEATURED: "/news/featured",
  PARTNERS_ACTIVE: "/partners/active",
  PARTNERS_REGISTER: "/partners",
  DEVOTIONAL_LAST: "/devotional/last",
  // Solo ADMIN
  ADMIN_NEWS: "/data/news",
  ADMIN_PARTNERS: "/data/partners",
  ADMIN_DEVOTIONAL: "/data/devotional",
} as const;
