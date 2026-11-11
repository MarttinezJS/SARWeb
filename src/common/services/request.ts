import { isAxiosError } from "axios";
import type { Response } from "../../models";

const STATUS_MESSAGES: Record<number, string> = {
  401: "Tu sesión no es válida. Inicia sesión de nuevo.",
  403: "No tienes permiso para realizar esta acción.",
  413: "El archivo es demasiado grande.",
  429: "Demasiados intentos. Espera un momento y vuelve a intentarlo.",
};

/**
 * Convierte cualquier error de Axios en el formato común de respuesta de la
 * API. Todo código HTTP >= 400 queda con `error: true` y con el `status` HTTP
 * real (algunas rutas responden 400/404 con `error: false` en el cuerpo).
 */
export const toErrorResponse = <T>(error: unknown): Response<T> => {
  if (isAxiosError<Response<T>>(error) && error.response) {
    const { status, statusText, data } = error.response;
    const fallback = STATUS_MESSAGES[status] ?? (statusText || "Error del servidor");
    // 5xx o respuesta sin el formato de la API (p. ej. un 502 del gateway)
    if (status > 500 || !data || typeof data !== "object") {
      return { error: true, status, message: fallback };
    }
    return { ...data, error: true, status, message: data.message || fallback };
  }
  if (isAxiosError(error)) {
    return {
      error: true,
      status: 0,
      message: "No se pudo conectar con el servidor. Revisa tu conexión.",
    };
  }
  return {
    error: true,
    status: 0,
    message: `Error de la aplicación: ${error instanceof Error ? error.message : String(error)}`,
  };
};
