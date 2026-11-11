import { isAxiosError } from "axios";
import type { Response } from "../../models";

/** Convierte cualquier error de Axios en el formato común de respuesta de la API. */
export const toErrorResponse = <T>(error: unknown): Response<T> => {
  if (isAxiosError<Response<T>>(error) && error.response) {
    const { status, statusText, data } = error.response;
    // 5xx o respuesta sin el formato de la API (p. ej. un 502 del gateway)
    if (status > 500 || !data || typeof data !== "object") {
      return { error: true, status, message: statusText || "Error del servidor" };
    }
    return data;
  }
  return {
    error: true,
    status: 0,
    message: `Error de la aplicación: ${error instanceof Error ? error.message : String(error)}`,
  };
};
