/* eslint-disable dot-notation */
/* eslint-disable no-underscore-dangle */
import axios from "axios";
import { refresh } from "../app/api/auth";

const PROD_API_URL = import.meta.env.VITE_PROD_API_URL;
const DEV_API_URL = import.meta.env.VITE_DEV_API_URL;
const ENV = import.meta.env.VITE_NODE_ENV;

const baseURL = ENV === "development" ? DEV_API_URL : PROD_API_URL;

export const axiosPublic = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const createAxiosInstance = async () => {
  const { accessToken } = await refresh();

  const axiosInstance = axios.create({
    baseURL, // Reemplaza con tu URL base
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  // Interceptor de respuesta para manejar el refresco del token
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const { accessToken } = await refresh();
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// Exportar la función para obtener la instancia de axios
let axiosInstance;
export const getAxiosInstance = async () => {
  if (!axiosInstance) {
    axiosInstance = await createAxiosInstance();
  }
  return axiosInstance;
};
