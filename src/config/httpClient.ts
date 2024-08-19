import axios from "axios";

export const httpClient = axios.create({
  baseURL: import.meta.env.PUBLIC_API_URL,
});

httpClient.interceptors.request.use((config) => {
  config.headers.setAuthorization(localStorage.getItem("access_token"));
  return config;
});

// httpClient.interceptors.response.use(null, (error) => {
//   const { stack, ...resp } = error;
//   console.log(resp);

//   return error;
// });
