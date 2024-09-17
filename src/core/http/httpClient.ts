import axios from "axios";
import { Environment } from "../../config/environment";

export const httpClient = axios.create({
  baseURL: Environment.VITE_API_URL,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  token && config.headers.setAuthorization(`Bearer ${token}`);
  return config;
});
