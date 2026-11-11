/**
 * Variables de entorno usadas por la web. Se listan una a una a propósito:
 * exportar `import.meta.env` completo hace que Vite incruste TODAS las
 * variables VITE_* en el JavaScript público (así se filtraba la API key de
 * AzuraCast). Todo lo que esté aquí es visible para cualquier visitante:
 * nunca pongas secretos en variables VITE_*.
 */
export const Environment = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_WS_URL: import.meta.env.VITE_WS_URL,
} as const;
