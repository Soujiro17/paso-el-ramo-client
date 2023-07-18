import { useState } from "react";
import { Center } from "@chakra-ui/layout";
import FormPromedio from "../../components/FormPromedio";
import Colecciones from "../../components/Colecciones";

function Inicio() {
  const [selectedCollection, setSelectedCollection] = useState(null);

  return (
    <div>
      <Colecciones
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
      />
      <Center>
        <FormPromedio
          coleccion={selectedCollection}
          clearSelected={() => setSelectedCollection("")}
        />
      </Center>
    </div>
  );
}

export default Inicio;
