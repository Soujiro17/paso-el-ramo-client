/* eslint-disable react/prop-types */
import { createContext, useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import defaultColecciones from "../data/colecciones";
import defaultValuesColeccion from "../data/defaultColeccion";

export const AuthContext = createContext({
  auth: "",
  setAuth: () => {},
  colecciones: [],
  setColecciones: () => {},
  addColeccion: (coleccion) => coleccion,
  removeColeccion: (id) => id,
  updateColeccion: ({ id, values }) => ({ id, values }),
});

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
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

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      colecciones,
      setColecciones,
      addColeccion,
      removeColeccion,
      updateColeccion,
    }),
    [auth, setAuth, colecciones, setColecciones]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
