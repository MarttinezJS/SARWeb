import { ReactElement } from "react";
import { Path } from "react-hook-form";

type RenderFunction<T = any> = (
  item: T,
  uid?: Path<T> | string
) => ReactElement;

export interface Column<T> {
  id: Path<T> | "actions";
  name: string;
  render?: RenderFunction<T>;
}
