/* eslint-disable react/prop-types */
import { createContext, useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";
import defaultColecciones from "../data/colecciones";
import defaultValuesColeccion from "../data/defaultColeccion";
import { refresh } from "../app/api/auth";

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
  const [colecciones, setColecciones] = useState(defaultColecciones);

  const addColeccion = () => {
    const newColeccion = { ...defaultValuesColeccion, id: uuidv4() };

    setColecciones((colecciones) => [...colecciones, newColeccion]);

    return newColeccion;
  };

  const removeColeccion = (id) =>
    setColecciones((colecciones) =>
      colecciones.filter((coleccion) => coleccion.id !== id)
    );

  const updateColeccion = ({ id, values }) =>
    setColecciones((colecciones) =>
      colecciones.map((coleccion) => (coleccion.id === id ? values : coleccion))
    );

  useQuery({
    queryKey: ["user"],
    queryFn: refresh,
    onSuccess: (data) => {
      setAuth(data.accessToken);
      setUser(data.user);
    },
    retry: 1,
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
