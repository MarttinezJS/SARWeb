import { httpClient } from "../../core";
import type { Response } from "../../models";
import { toErrorResponse } from "./request";

export const remove = async <T>(url: string): Promise<Response<T>> => {
  try {
    const { data } = await httpClient.delete<Response<T>>(url);
    return data;
  } catch (error) {
    return toErrorResponse<T>(error);
  }
};
