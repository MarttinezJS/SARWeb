export interface UserFields {
  name: string;
  email: string;
  username: string;
  password: string;
  role: "ADMIN" | "USUARIO";
}

export interface User {}
