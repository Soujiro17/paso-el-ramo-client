const basePath = "/coleccion";

export const getColecciones = async ({ axiosPrivate }) => {
  const { data } = await axiosPrivate.get(basePath);

  return data;
};

export const guardarColeccion = async ({ axiosPrivate, id, coleccion }) => {
  const { data } = await axiosPrivate.post(`${basePath}/${id}`, coleccion);

  return data;
};

export const eliminarColeccion = async ({ axiosPrivate, id }) => {
  const { data } = await axiosPrivate.delete(`${basePath}/${id}`);

  return data;
};
