import { Container } from "@chakra-ui/layout";
import FormPromedio from "../../components/FormPromedio";
import Colecciones from "../../components/Colecciones";
import PageLayout from "../../layouts/PageLayout";

function Inicio() {
  return (
    <PageLayout>
      <Container maxW="container.lg">
        <Colecciones />
        <FormPromedio />
      </Container>
    </PageLayout>
  );
}

export default Inicio;
