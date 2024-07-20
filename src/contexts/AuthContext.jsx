import { createContext, useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { refresh } from "../app/api/auth";
import { getColecciones } from "../app/api/colecciones";
import Spinner from "../components/Spinner";
import { useCollectionStore } from "../store";

export const AuthContext = createContext({
  auth: "",
  setAuth: () => {},
  user: null,
  setUser: () => {},
  colecciones: [],
  resetAll: () => {},
});

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCollections = useCollectionStore((state) => state.loadCollections);
  const clearCollections = useCollectionStore(
    (state) => state.clearCollections
  );

  /* PETICIONES */
  const { isLoading: isLoadingColecciones, refetch: refetchColecciones } =
    useQuery({
      queryKey: ["colecciones"],
      queryFn: getColecciones,
      onSuccess: (data) => loadCollections(data),
      enabled: false,
    });

  const { isLoading: isLoadingRefresh } = useQuery({
    queryKey: ["user"],
    queryFn: refresh,
    // enabled: false,
    onSuccess: (data) => {
      refetchColecciones();
      setAuth(data.accessToken);
      setUser(data.user);
    },
  });

  const resetAll = () => {
    setAuth("");
    setUser(null);
    clearCollections();
  };

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      user,
      setUser,
      resetAll,
    }),
    [auth, setAuth, user]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isLoadingColecciones, isLoadingRefresh]);

  useEffect(() => {
    if (auth) {
      refetchColecciones();
    }
  }, [auth]);

  if (loading) return <Spinner />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
