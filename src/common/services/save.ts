import { httpClient } from "../../core";
import type { Response } from "../../models";

export const save = async <T extends unknown>(
  url: string,
  data: any
): Promise<Response<T>> => {
  try {
    const { data: resp } = await httpClient.post(url, data);
    return resp;
  } catch (error: any) {
    return error.response
      ? error.response.status > 500
        ? {
            error: true,
            status: error.response.status,
            message: error.response.statusText,
          }
        : error.response.data
      : {
          error: true,
          message: "Error de la aplicación",
          status: 0,
        };
  }
};
