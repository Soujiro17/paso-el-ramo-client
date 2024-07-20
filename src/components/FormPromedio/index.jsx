/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Center, Highlight, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Nota from "../Nota";
import colors from "../../lib/colors";
import ColeccionHeader from "../ColeccionHeader";
import SumasNotas from "../SumasNotas";
import MutateColeccion from "../MutateColeccion";
import ResumenColeccion from "../ResumenColeccion";
import { useCollectionStore } from "../../store";

function FormPromedio() {
  const [promedioParcial, setPromedioParcial] = useState(0);
  const [promedioFinal, setPromedioFinal] = useState(0);

  const coleccion = useCollectionStore((state) => state.selectedCollection);

  const handleCollectionValues = useCollectionStore(
    (state) => state.handleValuesSelected
  );

  // const toast = useToast();

  const calcularPromedioParcial = () => {
    const notasPonderadas = coleccion?.notas?.reduce(
      (a, b) => a + b.nota * (b.porcentaje / 100),
      0
    );

    setPromedioParcial(notasPonderadas);
  };

  const calcularPromedioFinal = () => {
    setPromedioFinal(
      promedioParcial * (1 - coleccion?.examen?.porcentaje / 100) +
        (coleccion?.examen?.nota * coleccion?.examen.porcentaje) / 100
    );
  };

  let contentToRender;

  if (!coleccion)
    contentToRender = (
      <Text fontSize="2xl" className="seleccionar-coleccion">
        <Highlight
          query="Selecciona"
          styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
        >
          Selecciona una colección para editar
        </Highlight>
      </Text>
    );
  else if (coleccion?.notas?.length === 0)
    contentToRender = (
      <Text fontSize="2xl">No hay notas en esta colección</Text>
    );
  else if (coleccion.notas)
    contentToRender = coleccion?.notas?.map(
      ({ id, nota, porcentaje, nombre }, index) => (
        <Nota
          key={id}
          id={id}
          index={index}
          nombre={nombre}
          nota={nota}
          porcentaje={porcentaje}
        />
      )
    );

  useEffect(() => {
    if (coleccion?.examen) {
      calcularPromedioFinal();
    }
  }, [coleccion?.examen]);

  useEffect(() => {
    if (coleccion?.notas) {
      calcularPromedioParcial();
    }
  }, [coleccion?.notas]);

  return (
    <>
      <Card
        gap="10px"
        alignItems="center"
        padding="12"
        width="50%"
        className="notas-container"
      >
        {coleccion && (
          <>
            <ColeccionHeader
              nombre={coleccion.nombre}
              handleValues={handleCollectionValues}
            />
            <Center
              textAlign="center"
              color={colors.gray3}
              className="nota-container"
            >
              <Text width="120px" className="nota-nombre custom-label-nombre">
                Nombre
              </Text>
              <Text width="150px" className="input-nota">
                Nota
              </Text>
              <Text width="150px" className="input-porcentaje">
                Porcentaje
              </Text>
            </Center>
          </>
        )}
        {contentToRender}
        {coleccion && (
          <>
            <SumasNotas coleccion={coleccion} />
            <MutateColeccion />
          </>
        )}
      </Card>
      {coleccion && (
        <ResumenColeccion
          examen={coleccion.examen}
          notaMinimaAprobacion={coleccion.notaMinimaAprobacion}
          promedioFinal={promedioFinal}
          promedioParcial={promedioParcial}
        />
      )}
    </>
  );
}

export default FormPromedio;
