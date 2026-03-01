import AsyncStorage from "@react-native-async-storage/async-storage";

import axios, { AxiosInstance } from "axios";

let apiClient: AxiosInstance | null = null;

export const getApiClient = async () => {
  if (apiClient) return apiClient;

  const IP = await AsyncStorage.getItem("server_ip");

  if (!IP) {
    throw new Error("No hay IP guardada en AsyncStorage");
  }

  apiClient = axios.create({
    baseURL: `http://172.20.10.2:8000`,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 120_000,
  });

  // Interceptor request
  apiClient.interceptors.request.use(
    (config) => {
      const method = config.method?.toUpperCase();
      const url = config.url;

      console.log(`➡️ [REQUEST] ${method} ${url}`);
      return config;
    },
    (error) => {
      console.error("❌ [REQUEST ERROR]", error);
      return Promise.reject(error);
    },
  );

  // Interceptor response
  apiClient.interceptors.response.use(
    (response) => {
      const method = response.config.method?.toUpperCase();
      const url = response.config.url;

      console.log(`✅ [RESPONSE] ${method} ${url} - ${response.status}`);
      return response;
    },
    (error) => {
      const method = error.config?.method?.toUpperCase();
      const url = error.config?.url;
      const status = error.response?.status;

      console.error(`❌ [ERROR] ${method} ${url} - Status: ${status}`);
      return Promise.reject(error);
    },
  );
  return apiClient;
};
export default getApiClient;
