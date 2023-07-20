/* eslint-disable react/prop-types */
import { createContext, useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";
import defaultValuesColeccion from "../data/defaultColeccion";
import usePrivateQuery from "../hooks/usePrivateQuery";
import usePrivateMutation from "../hooks/usePrivateMutation";
import { refresh } from "../app/api/auth";
import {
  eliminarColeccion,
  getColecciones,
  guardarColeccion,
} from "../app/api/colecciones";

export const AuthContext = createContext({
  auth: "",
  setAuth: () => {},
  user: "",
  setUser: () => {},
  colecciones: [],
  setColecciones: () => {},
  addColeccion: (coleccion) => coleccion,
  removeColeccion: (id) => id,
  updateColeccion: ({ id, values }) => ({ id, values }),
});

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [colecciones, setColecciones] = useState([]);

  const { mutateAsync: saveColeccion } = usePrivateMutation({
    mutationKey: ["save-coleccion"],
    mutationFn: guardarColeccion,
  });

  const { mutateAsync: deleteColeccion } = usePrivateMutation({
    mutationKey: ["delete-coleccion"],
    mutationFn: eliminarColeccion,
  });

  const addColeccion = () => {
    const newColeccion = { ...defaultValuesColeccion, id: uuidv4() };

    setColecciones((colecciones) => [...colecciones, newColeccion]);

    return newColeccion;
  };

  const removeColeccion = async (id) => {
    const res = await deleteColeccion({ id });

    if (!res?.mensaje) return;

    setColecciones((colecciones) =>
      colecciones.filter((coleccion) => coleccion.id !== id)
    );
  };

  const updateColeccion = async ({ id, values }) => {
    const res = await saveColeccion({ id, coleccion: values });

    if (!res?.mensaje) return;

    setColecciones((colecciones) =>
      colecciones.map((coleccion) => (coleccion.id === id ? values : coleccion))
    );
  };

  useQuery({
    queryKey: ["user"],
    queryFn: refresh,
    onSuccess: (data) => {
      setAuth(data.accessToken);
      setUser(data.user);
    },
    retry: 1,
  });

  usePrivateQuery({
    queryKey: ["colecciones"],
    queryFn: getColecciones,
    onSuccess: (data) => setColecciones(data),
  });

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      colecciones,
      setColecciones,
      addColeccion,
      removeColeccion,
      updateColeccion,
      user,
      setUser,
    }),
    [auth, setAuth, colecciones, setColecciones, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
