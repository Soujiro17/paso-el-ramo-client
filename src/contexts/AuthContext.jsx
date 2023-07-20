/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState, useMemo, useEffect } from "react";
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
import Spinner from "../components/Spinner";

export const AuthContext = createContext({
  auth: "",
  setAuth: () => {},
  user: null,
  setUser: () => {},
  colecciones: [],
  setColecciones: () => {},
  addColeccion: (coleccion) => coleccion,
  removeColeccion: (id) => id,
  updateColeccion: ({ id, values }) => ({ id, values }),
  resetAll: () => {},
});

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [colecciones, setColecciones] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const coleccion = colecciones.find((coleccion) => coleccion.id === id);

    if (coleccion.saved) {
      const res = await deleteColeccion({ id })
        .then(() => true)
        .catch(() => false);

      if (!res) return false;
    }

    setColecciones((colecciones) =>
      colecciones.filter((coleccion) => coleccion.id !== id)
    );

    return true;
  };

  const updateColeccion = async ({ id, values }) => {
    const res = await saveColeccion({ id, coleccion: values })
      .then(() => true)
      .catch(() => false);

    if (!res) return false;

    setColecciones((colecciones) =>
      colecciones.map((coleccion) => (coleccion.id === id ? values : coleccion))
    );

    return true;
  };

  const resetAll = () => {
    setAuth("");
    setUser(null);
    setColecciones([]);
  };

  const { isLoading: isLoadingColecciones, refetch: refetchColecciones } =
    usePrivateQuery({
      queryKey: ["colecciones"],
      queryFn: getColecciones,
      onSuccess: (data) => setColecciones(data),
      enabled: false,
    });

  const { isLoading: isLoadingRefresh } = useQuery({
    queryKey: ["user"],
    queryFn: refresh,
    onSuccess: (data) => {
      refetchColecciones();
      setAuth(data.accessToken);
      setUser(data.user);
    },
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
      resetAll,
    }),
    [
      auth,
      setAuth,
      colecciones,
      setColecciones,
      user,
      removeColeccion,
      updateColeccion,
    ]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isLoadingColecciones, isLoadingRefresh]);

  if (loading) return <Spinner />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
