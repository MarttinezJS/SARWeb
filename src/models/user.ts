export type Role = "ADMIN" | "USUARIO";

export const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Administrador",
  USUARIO: "Usuario",
};

export interface UserFields {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: Role;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: Role;
  active: boolean;
  changePassword?: boolean;
}

/** Datos del usuario que viajan dentro del JWT. */
export interface SessionUser {
  id: number | string;
  role: Role;
  name: string;
}
