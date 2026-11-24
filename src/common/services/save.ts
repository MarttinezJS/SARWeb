import { httpClient } from "../../core";
import type { Response } from "../../models";
import { toErrorResponse } from "./request";

export const save = async <T>(url: string, body: unknown): Promise<Response<T>> => {
  try {
    const { data } = await httpClient.post<Response<T>>(url, body);
    return data;
  } catch (error) {
    return toErrorResponse<T>(error);
  }
};
