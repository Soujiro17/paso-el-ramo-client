import { getAxiosInstance } from "../../services";

const basePath = "/coleccion";

export const getColecciones = async () => {
  const axiosInstance = await getAxiosInstance();
  const { data } = await axiosInstance.get(basePath);

  return data;
};

export const crearColeccion = async ({ coleccion }) => {
  const axiosInstance = await getAxiosInstance();
  const { data } = await axiosInstance.post(`${basePath}/`, coleccion);

  return data;
};

export const actualizarColeccion = async ({ id, coleccion }) => {
  const axiosInstance = await getAxiosInstance();
  const { data } = await axiosInstance.put(`${basePath}/${id}`, coleccion);

  return data;
};

export const eliminarColeccion = async ({ id }) => {
  const axiosInstance = await getAxiosInstance();
  const { data } = await axiosInstance.delete(`${basePath}/${id}`);

  return data;
};
