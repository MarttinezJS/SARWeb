import axios from "axios";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  token && config.headers.setAuthorization(`Bearer ${token}`);
  return config;
});
