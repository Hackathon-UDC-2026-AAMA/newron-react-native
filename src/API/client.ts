import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://172.20.10.2:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 120_000,
});

/*
// Interceptor para logs automáticos (opcional)
apiClient.interceptors.request.use(
  (config) => {
    console.log(
      "📤 Enviando petición:",
      config.method?.toUpperCase(),
      config.url,
    );
    return config;
  },
  (error) => Promise.reject(error),
);

//Interceptor para respuestas
apiClient.interceptors.response.use(
  (response) => {
    console.log("📥 Respuesta recibida:", response.status);
    return response;
  },
  (error) => {
    console.log(
      "❌ Error en respuesta:",
      error.response?.data || error.message,
    );
    return Promise.reject(error);
  },
);
*/

export default apiClient;
