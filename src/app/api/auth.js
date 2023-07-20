import { axiosPublic } from "../../services";

const basePath = "/auth";

export const login = async (credentials) => {
  const { data } = await axiosPublic.post(basePath, credentials);

  return data;
};

export const signUp = async (credentials) => {
  const { data } = await axiosPublic.post(`${basePath}/signup`, credentials);

  return data;
};

export const refresh = async () => {
  const { data } = await axiosPublic.get(`${basePath}/refresh`);

  return data;
};

export const logout = async () => {
  const { data } = await axiosPublic.get(`${basePath}/logout`);

  return data;
};
