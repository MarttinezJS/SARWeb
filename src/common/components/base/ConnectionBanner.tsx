import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { MdRefresh, MdWifiOff } from "react-icons/md";
import { refreshNowPlaying, useAzuraStore } from "../../../hooks";

const useOnline = () => {
  const [online, setOnline] = useState(() => navigator.onLine);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return online;
};

/**
 * Aviso bajo la barra de navegación cuando no hay conexión con la emisora:
 * sin internet, AzuraCast no responde (API o audio) o el WebSocket de
 * "ahora suena" no conecta. Desaparece solo al recuperarse.
 */
export const ConnectionBanner = () => {
  const online = useOnline();
  const wsStatus = useAzuraStore((s) => s.wsStatus);
  const azuraError = useAzuraStore((s) => s.azuraError);
  const streamError = useAzuraStore((s) => s.streamError);
  const [retrying, setRetrying] = useState(false);

  let title: string | undefined;
  let description: string | undefined;
  let canRetry = false;

  if (!online) {
    title = "Sin conexión a internet";
    description = "Revisa tu conexión. La radio y la información se reanudarán al volver.";
  } else if (azuraError || streamError) {
    title = "No pudimos conectar con la emisora";
    description = azuraError
      ? "No se pudo consultar lo que está sonando en la radio."
      : "La señal de audio no está disponible en este momento.";
    canRetry = Boolean(azuraError);
  } else if (wsStatus === "down") {
    title = "Sin actualización en tiempo real";
    description = "La canción en pantalla puede no estar al día. Reintentando…";
  }

  if (!title) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="border-b border-warning-300 bg-warning-100 text-warning-900"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 text-sm sm:px-6 lg:px-8">
        <MdWifiOff aria-hidden="true" className="shrink-0 text-lg" />
        <p className="min-w-0 flex-1">
          <span className="font-semibold">{title}.</span> {description}
        </p>
        {canRetry && (
          <Button
            size="sm"
            variant="flat"
            color="warning"
            isLoading={retrying}
            startContent={!retrying && <MdRefresh aria-hidden="true" />}
            onPress={async () => {
              setRetrying(true);
              await refreshNowPlaying();
              setRetrying(false);
            }}
          >
            Reintentar
          </Button>
        )}
      </div>
    </div>
  );
};
