import { useContext } from "react";
import { CollectionsContext } from "../contexts/CollectionsContext";

export default function useCollections() {
  return useContext(CollectionsContext);
}
