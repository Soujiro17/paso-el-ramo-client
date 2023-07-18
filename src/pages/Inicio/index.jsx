import { useState } from "react";
import FormPromedio from "../../components/FormPromedio";
import Colecciones from "../../components/Colecciones";

function Inicio() {
  const [selectedCollection, setSelectedCollection] = useState("");

  return (
    <div>
      <Colecciones
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
      />
      <FormPromedio
        coleccion={selectedCollection}
        clearSelected={() => setSelectedCollection("")}
      />
    </div>
  );
}

export default Inicio;
