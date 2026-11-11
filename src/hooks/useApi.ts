import { useCallback, useEffect, useState } from "react";
import { get } from "../common/services/get";

export interface ApiState<T> {
  /** Último dato recibido (se conserva mientras se recarga). */
  data: T | undefined;
  /** Mensaje de error de la última petición, si falló. */
  error: string | undefined;
  isLoading: boolean;
  reload: () => void;
}

interface Result<T> {
  key: string;
  data?: T;
  error?: string;
}

/**
 * GET declarativo: carga `url` al montar y cada vez que cambia. Un 404 se
 * trata como "sin datos" (así responde la API cuando aún no hay contenido).
 * Con `url = null` no hace ninguna petición. Al cambiar `refreshKey` se vuelve
 * a pedir la misma URL (p. ej. tras crear un registro).
 */
export const useApi = <T>(url: string | null, refreshKey: string | number = 0): ApiState<T> => {
  const [nonce, setNonce] = useState(0);
  const [result, setResult] = useState<Result<T>>();
  const key = `${url}#${nonce}#${refreshKey}`;

  useEffect(() => {
    if (url === null) return;
    let cancelled = false;
    get<T>(url).then((resp) => {
      if (cancelled) return;
      const failed = resp.error && resp.status !== 404;
      setResult({
        key,
        data: resp.error ? undefined : resp.body,
        error: failed ? resp.message || "No se pudo cargar la información." : undefined,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [url, key]);

  const reload = useCallback(() => setNonce((n) => n + 1), []);
  const settled = result?.key === key;

  return {
    data: url === null ? undefined : result?.data,
    error: settled ? result.error : undefined,
    isLoading: url !== null && !settled,
    reload,
  };
};
