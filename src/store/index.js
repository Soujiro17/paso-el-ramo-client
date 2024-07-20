/* eslint-disable import/prefer-default-export */
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const useCollectionStore = create((set, get) => ({
  collections: [],
  selectedCollection: null,

  handleValuesSelected: (attrName, attrValue) =>
    set((state) => ({
      ...state,
      selectedCollection: {
        ...state.selectedCollection,
        [attrName]: attrValue,
        notas: state.selectedCollection.notas,
      },
    })),
  /* Collections */
  addCollection: () =>
    set((state) => {
      const idCollection = uuidv4();

      const newCollection = {
        nombre: "Nueva colección",
        id: idCollection,
        mismoPorcentaje: false,
        notaMinimaAprobacion: 39.5,
        notaMinima: 10,
        notaMaxima: 70,
        promedioParcial: 0,
        promedioFinal: 0,
        examen: null,
        notas: [],
        synced: false,
      };

      return {
        ...state,
        collections: [newCollection, ...state.collections],
        selectedCollection: newCollection,
      };
    }),

  saveCollection: () =>
    set((state) => ({
      ...state,
      collections: state.collections.map((c) =>
        c.id === state.selectedCollection.id
          ? { ...c, ...state.selectedCollection, synced: true }
          : c
      ),
      selectedCollection: null,
    })),

  removeCollection: (idCollection) => {
    if (idCollection === get().selectedCollection?.id)
      return set((state) => ({
        ...state,
        collections: state.collections.filter(
          (c) => c.id !== state.selectedCollection.id
        ),
        selectedCollection: null,
      }));

    return set((state) => ({
      ...state,
      collections: state.collections.filter((c) => c.id !== idCollection),
    }));
  },

  clearCollections: () =>
    set((state) => ({ ...state, collections: [], selectedCollection: null })),

  loadCollections: (collections) =>
    set((state) => ({ collections: [...state.collections, ...collections] })),

  selectCollection: (idCollection) =>
    set((state) => ({
      ...state,
      selectedCollection:
        idCollection === null
          ? null
          : state.collections.find((c) => c.id === idCollection),
    })),
  /* Notas */

  addNota: (type = "nota") => {
    const nota = {
      id: uuidv4(),
      nombre: "Exámen",
      nota: "",
      porcentaje: "",
    };

    if (type === "examen")
      return set((state) => ({
        ...state,
        selectedCollection: { ...state.selectedCollection, examen: nota },
      }));

    return set((state) => ({
      ...state,
      selectedCollection: {
        ...state.selectedCollection,
        notas: [
          ...state.selectedCollection.notas,
          {
            ...nota,
            nombre: `Nota ${state.selectedCollection.notas.length + 1}`,
          },
        ],
      },
    }));
  },

  updateNota: (idNota, attrName, attrValue, type = "nota") => {
    if (type === "examen")
      return set((state) => ({
        ...state,
        selectedCollection: {
          ...state.selectedCollection,
          examen: { ...state.selectedCollection.examen, [attrName]: attrValue },
        },
      }));

    return set((state) => ({
      ...state,
      selectedCollection: {
        ...state.selectedCollection,
        notas: state.selectedCollection.notas.map((n) =>
          n.id === idNota ? { ...n, [attrName]: attrValue } : n
        ),
      },
    }));
  },

  removeNota: (idNota, type = "nota") => {
    if (type === "examen")
      return set((state) => ({
        ...state,
        selectedCollection: { ...state.selectedCollection, examen: null },
      }));

    return set((state) => ({
      ...state,
      selectedCollection: {
        ...state.selectedCollection,
        notas: state.selectedCollection.notas.filter((n) => n.id !== idNota),
      },
    }));
  },

  clearNotas: () =>
    set((state) => ({
      ...state,
      selectedCollection: { ...state.selectedCollection, notas: [] },
    })),
}));
