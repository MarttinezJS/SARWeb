export interface UserFields {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: "ADMIN" | "USUARIO";
}

export interface User {
  id: string;
  email: string;
  eventsSupported: [];
  firstName: string;
  lastName: string;
  username: string;
  role: "ADMIN" | "USUARIO";
  active: boolean;
}
