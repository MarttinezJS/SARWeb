import { decodeJwt } from "jose";
import { Endpoints, get, save } from "../../common";
import { Response, UserFields } from "../../models";

interface UserData {
  id: string;
  role: string;
  name: string;
}

interface AuthProvider {
  isAuthenticated: boolean;
  userData: UserData | null;
  logout(): void;
  sessionValid(): Promise<boolean>;
  login(
    username: string,
    password: string
  ): Promise<{ pass: boolean; resp: Response<any> }>;
  signup(formData: UserFields): Promise<{ pass: boolean; resp: Response<any> }>;
}

export const authProvider: AuthProvider = {
  isAuthenticated: false,
  userData: null,
  async login(username, password) {
    const resp = await save<{ access_token: string }>(Endpoints.LOGIN, {
      username,
      password,
    });
    if (resp.error == false) {
      const token = resp.body?.access_token;
      if (token) {
        localStorage.setItem("access_token", token);
        const data = decodeJwt<any>(token);
        authProvider.userData = { ...data };
        authProvider.isAuthenticated = true;
        return {
          pass: true,
          resp,
        };
      }
    }
    return {
      pass: false,
      resp,
    };
  },
  async sessionValid() {
    try {
      const resp = await get<UserData>(`${Endpoints.USERS}/token`);
      const isError = resp.error;
      if (isError) {
        return false;
      }
      const token = localStorage.getItem("access_token");
      if (token != null) {
        const data = decodeJwt<any>(token);
        authProvider.userData = { ...data };
      }
      authProvider.isAuthenticated = true;
      return true;
    } catch (error) {
      return false;
    }
  },
  logout() {
    localStorage.clear();
    authProvider.isAuthenticated = false;
    authProvider.userData = null;
  },
  async signup(formData: UserFields) {
    const resp = await save<{ access_token: string }>(
      Endpoints.SIGN_UP,
      formData
    );
    const body = resp.body;
    if (body == null || resp.error == true) {
      return {
        pass: false,
        resp: resp,
      };
    }
    const token = body.access_token;
    localStorage.setItem("access_token", token);
    const userData = decodeJwt<any>(token);
    authProvider.userData = { ...userData };
    authProvider.isAuthenticated = true;
    return {
      pass: true,
      resp: resp,
    };
  },
};
