import { create } from "zustand";
import { decodeJwt } from "jose";
import { addToast } from "@heroui/toast";
import { Endpoints, get, save } from "../../common";
import type { Response, SessionUser, UserFields } from "../../models";
import { httpClient } from "../http/httpClient";

const TOKEN_KEY = "access_token";

interface JwtPayload {
  data: SessionUser;
  iat: number;
  jti: string;
  exp: number;
}

type AuthResult = { pass: boolean; resp: Response<unknown> };

interface AuthProviderProps {
  isAuthenticated: boolean;
  userData: SessionUser | null;
  /** true cuando el servidor ya confirmó el token en esta visita. */
  verified: boolean;
  logout(): void;
  sessionValid(): Promise<boolean>;
  login(username: string, password: string): Promise<AuthResult>;
  signup(formData: Omit<UserFields, "role">): Promise<AuthResult>;
}

/** Lee el token guardado; si no existe, está dañado o ya expiró, lo descarta. */
const readSession = (): SessionUser | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  try {
    const { data, exp } = decodeJwt<JwtPayload>(token);
    if (!data || !exp || exp * 1000 <= Date.now()) throw new Error("expirado");
    return data;
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
};

const initialUser = readSession();

export const authProvider = create<AuthProviderProps>((set, getState) => {
  /** Guarda el token recibido y abre la sesión. */
  const openSession = (resp: Response<{ access_token: string }>): AuthResult => {
    const token = resp.body?.access_token;
    if (resp.error || !token) return { pass: false, resp };
    localStorage.setItem(TOKEN_KEY, token);
    const userData = readSession();
    if (!userData) return { pass: false, resp };
    set({ userData, isAuthenticated: true, verified: true });
    return { pass: true, resp };
  };

  return {
    isAuthenticated: initialUser !== null,
    userData: initialUser,
    verified: false,
    async login(username, password) {
      return openSession(
        await save<{ access_token: string }>(Endpoints.LOGIN, { username, password }),
      );
    },
    async signup(formData) {
      return openSession(await save<{ access_token: string }>(Endpoints.SIGN_UP, formData));
    },
    async sessionValid() {
      const userData = readSession();
      if (!userData) {
        getState().logout();
        return false;
      }
      const resp = await get<unknown>(Endpoints.SESSION);
      if (resp.status === 401 || resp.status === 403) {
        getState().logout();
        return false;
      }
      // Si el servidor no responde se conserva la sesión local (el token
      // sigue vigente); las peticiones protegidas fallarán con su propio error.
      set({ userData, isAuthenticated: true, verified: !resp.error });
      return true;
    },
    logout() {
      localStorage.removeItem(TOKEN_KEY);
      set({ userData: null, isAuthenticated: false, verified: false });
    },
  };
});

// Antes de cada petición: si el token ya expiró, se cierra la sesión para no
// enviar credenciales vencidas (este interceptor corre antes que el de
// httpClient, que es el que añade la cabecera Authorization).
httpClient.interceptors.request.use((config) => {
  if (authProvider.getState().isAuthenticated && !readSession()) {
    authProvider.getState().logout();
    addToast({ title: "Tu sesión expiró", description: "Inicia sesión de nuevo.", color: "warning" });
  }
  return config;
});

// 401 con sesión abierta: el servidor ya no acepta el token.
httpClient.interceptors.response.use(undefined, (error: unknown) => {
  const status = (error as { response?: { status?: number } }).response?.status;
  const url = (error as { config?: { url?: string } }).config?.url ?? "";
  if (status === 401 && url !== Endpoints.LOGIN && authProvider.getState().isAuthenticated) {
    authProvider.getState().logout();
    addToast({ title: "Tu sesión expiró", description: "Inicia sesión de nuevo.", color: "warning" });
  }
  return Promise.reject(error);
});
