import { Center } from "@chakra-ui/layout";
import FormPromedio from "../../components/FormPromedio";
import Colecciones from "../../components/Colecciones";
import PageLayout from "../../layouts/PageLayout";

function Inicio() {
  return (
    <PageLayout>
      <Colecciones />
      <Center>
        <FormPromedio />
      </Center>
    </PageLayout>
  );
}

export default Inicio;
