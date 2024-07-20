/* eslint-disable no-unused-vars */
import { createContext, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useToast } from "@chakra-ui/react";
import { useCollectionStore } from "../store";
import {
  eliminarColeccion,
  actualizarColeccion,
  crearColeccion,
} from "../app/api/colecciones";
import useAuth from "../hooks/useAuth";
import useMidMutation from "../hooks/useMidMutation";

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

  const toast = useToast();

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
  const { mutateAsync: mutateSaveCollection } = useMidMutation({
    mutationKey: ["save-coleccion"],
    mutationFn: (data) => {
      if (user && !selectedCollection.synced)
        return crearColeccion({ ...data, coleccion: selectedCollection });
      if (user && selectedCollection.synced)
        return actualizarColeccion({
          ...data,
          coleccion: selectedCollection,
          id: selectedCollection.id,
        });

      return data;
    },
    onSuccessCallback: (data) => {
      saveCollection();
    },
    onSuccessMessage: "Colección guardada con éxito",
    onErrorMessage: "Error al guardar la colección, vuelve a intentarlo",
  });

  const { mutateAsync: mutateRemoveCollection } = useMidMutation({
    mutationKey: ["delete-coleccion"],
    mutationFn: (data) => {
      if (user && data.synced) return eliminarColeccion({ ...data });

      return data;
    },
    onSuccess: (data) => {
      removeCollection(data.id);
    },
    onSuccessMessage: "Colección eliminada con éxito",
    onErrorMessage: "Error al eliminar la colección, vuelve a intentarlo",
  });

  const value = useMemo(
    () => ({
      colecciones,
      addCollection,
      saveCollection,
      selectedCollection,
      selectCollection,
      mutateSaveCollection,
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
