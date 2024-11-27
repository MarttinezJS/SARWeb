import { httpClient } from "../../core";
import { Response } from "../../models";

export const get = async <T extends unknown>(
  url: string
): Promise<Response<T>> => {
  try {
    const { data: resp } = await httpClient.get(url);
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
          message: "Error de la aplicación: " + error.toString(),
          status: 0,
        };
  }
};
