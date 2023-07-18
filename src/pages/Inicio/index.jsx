import { useState } from "react";
import { Center } from "@chakra-ui/layout";
import FormPromedio from "../../components/FormPromedio";
import Colecciones from "../../components/Colecciones";
import PageLayout from "../../layouts/PageLayout";

function Inicio() {
  const [selectedCollection, setSelectedCollection] = useState(null);

  return (
    <PageLayout>
      <Colecciones
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
      />
      <Center>
        <FormPromedio
          coleccion={selectedCollection}
          clearSelected={() => setSelectedCollection(null)}
        />
      </Center>
    </PageLayout>
  );
}

export default Inicio;
