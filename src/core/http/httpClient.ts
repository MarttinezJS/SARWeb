import axios from "axios";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use((config) => {
  config.headers.setAuthorization(localStorage.getItem("access_token"));
  return config;
});
