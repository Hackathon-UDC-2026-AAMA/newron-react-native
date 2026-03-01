import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IP = AsyncStorage.getItem("server_ip")

const apiClient = axios.create({

baseURL: `http://${IP}:8000`,

headers: {
  "Content-Type": "application/json",
},
timeout: 120_000,
});

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
  }
);

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

    console.error(`🔥 [ERROR] ${method} ${url} - Status: ${status}`);
    return Promise.reject(error);
  },
);

export default apiClient;
