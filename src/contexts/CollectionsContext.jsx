/* eslint-disable no-unused-vars */
import { createContext, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useCollectionStore } from "../store";
import usePrivateMutation from "../hooks/usePrivateMutation";
import { eliminarColeccion, guardarColeccion } from "../app/api/colecciones";
import useAuth from "../hooks/useAuth";

export const CollectionsContext = createContext({
  colecciones: [],
  addCollection: () => {},
  selectCollection: () => {},
  selectedCollection: null,
  addNota: () => {},
  updateNota: (idNota, value) => {},
  removeNota: (idNota, type = "nota") => {},
  saveCollection: () => {},
});

function CollectionsProvider({ children }) {
  const { user } = useAuth();
  const colecciones = useCollectionStore((state) => state.collections);

  /* COLECCIONES CRUD */
  const {
    addCollection,
    saveCollection,
    removeCollection,
    // clearCollections,
    selectCollection,
    selectedCollection,
  } = useCollectionStore(
    useShallow((state) => ({
      addCollection: state.addCollection,
      saveCollection: state.saveCollection,
      removeCollection: state.removeCollection,
      clearCollections: state.clearCollections,
      selectCollection: state.selectCollection,
      selectedCollection: state.selectedCollection,
    }))
  );

  /* NOTAS CRUD */
  const { addNota, updateNota, removeNota, clearNotas } = useCollectionStore(
    useShallow((state) => ({
      addNota: state.addNota,
      updateNota: state.updateNota,
      removeNota: state.removeNota,
      clearNotas: state.clearNotas,
    }))
  );

  /* PETICIONES */
  const { mutateAsync: mutateUpdateCollection } = usePrivateMutation({
    mutationKey: ["save-coleccion"],
    mutationFn: (data) => {
      if (user) guardarColeccion({ ...data });

      return data;
    },
    onSuccess: () => {
      saveCollection();
    },
  });

  const { mutateAsync: mutateRemoveCollection } = usePrivateMutation({
    mutationKey: ["delete-coleccion"],
    mutationFn: (data) => {
      if (user && data.isSynced) eliminarColeccion({ ...data });

      return data;
    },
    onSuccess: (data) => {
      removeCollection(data.id);
    },
  });

  const value = useMemo(
    () => ({
      colecciones,
      addCollection,
      saveCollection,
      selectedCollection,
      selectCollection,
      mutateUpdateCollection,
      mutateRemoveCollection,

      /* Notas */
      addNota,
      updateNota,
      removeNota,
      clearNotas,
    }),
    [colecciones, selectedCollection]
  );

  return (
    <CollectionsContext.Provider value={value}>
      {children}
    </CollectionsContext.Provider>
  );
}

export default CollectionsProvider;
