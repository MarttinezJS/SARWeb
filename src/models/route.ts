import { ReactNode } from "react";

export interface Route {
  id: string;
  title: string;
  name: string;
  parent?: boolean;
  roles?: "ADMIN";
  icon: ReactNode;
  link: string;
  child?: Route[];
}
