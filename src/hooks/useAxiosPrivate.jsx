/* eslint-disable no-param-reassign */
import { useEffect } from "react";
import { axiosPrivate } from "../services";
import useAuth from "./useAuth";
import { refresh } from "../app/api/auth";

const useAxiosPrivate = () => {
  const { auth } = useAuth();

  const token = auth;

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;

        if (err?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const token = await refresh();
          const newAccessToken = token.accessToken;
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }

        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token]);

  return axiosPrivate;
};

export default useAxiosPrivate;
