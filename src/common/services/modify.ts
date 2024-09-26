import { httpClient } from "../../core";
import { Response } from "../../models";

export const modify = async <T extends unknown>(
  url: string,
  data: any
): Promise<Response<T>> => {
  try {
    const { data: resp } = await httpClient.put(url, data);
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
