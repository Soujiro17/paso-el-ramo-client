import axios from "axios";

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

export const axiosPrivate = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
