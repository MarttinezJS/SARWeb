/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_CLOUD_NAME: string;
  readonly VITE_WS_URL: string;
  readonly VITE_AZURA_API_KEY: string;
  readonly VITE_AZURA_API_URL: string;
  readonly VITE_STATION_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
