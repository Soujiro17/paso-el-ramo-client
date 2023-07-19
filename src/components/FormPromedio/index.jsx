/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Flex,
  FormLabel,
  Highlight,
  Input,
  InputGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../../hooks/useAuth";
import Nota from "../Nota";
import AlertDialogComponent from "../AlertDialog";
import colors from "../../lib/colors";
import ColeccionHeader from "../ColeccionHeader";
import SumasNotas from "../SumasNotas";
import MutateColeccion from "../MutateColeccion";
import ResumenColeccion from "../ResumenColeccion";

function FormPromedio({ coleccion, clearSelected }) {
  const [newColeccion, setNewColeccion] = useState(null);

  const toast = useToast();

  const { updateColeccion, removeColeccion } = useAuth();

  const addNota = () =>
    setNewColeccion((prev) => ({
      ...prev,
      notas: [
        ...prev.notas,
        {
          id: uuidv4(),
          nombre: `Nota ${newColeccion.notas.length + 1}`,
          nota: "",
          porcentaje: "",
        },
      ],
    }));

  const deleteNota = (id) => {
    if (id === "examen") {
      setNewColeccion((prev) => ({
        ...prev,
        examen: null,
      }));

      return;
    }

    setNewColeccion((prev) => ({
      ...prev,
      notas: newColeccion.notas.filter((nota) => nota.id !== id),
    }));
  };

  const updateNota = (ev, id) => {
    if (id === "examen") {
      setNewColeccion((prev) => ({
        ...prev,
        examen: { ...prev.examen, [ev.target.name]: ev.target.value },
      }));

      return;
    }

    setNewColeccion((prev) => ({
      ...prev,
      notas: newColeccion.notas.map((nota) => {
        if (nota.id === id)
          return { ...nota, [ev.target.name]: ev.target.value };

        return nota;
      }),
    }));
  };

  const updateNewColeccion = (ev) =>
    setNewColeccion((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));

  const addExamen = () =>
    setNewColeccion((prev) => ({
      ...prev,
      examen: {
        id: uuidv4(),
        nombre: "Exámen",
        nota: "",
        porcentaje: "",
      },
    }));

  const calcularPromedioParcial = () => {
    const notasPonderadas = newColeccion?.notas?.reduce(
      (a, b) => a + b.nota * (b.porcentaje / 100),
      0
    );

    setNewColeccion((prev) => ({
      ...prev,
      promedioParcial: notasPonderadas,
    }));
  };

  const calcularPromedioFinal = () => {
    setNewColeccion((prev) => ({
      ...prev,
      promedioFinal:
        prev.promedioParcial * (1 - prev.examen.porcentaje / 100) +
        (prev.examen.nota * prev.examen.porcentaje) / 100,
    }));
  };

  const deleteColeccion = () => {
    removeColeccion(newColeccion.id);
    setNewColeccion(null);
  };

  const saveColeccion = () => {
    toast({
      status: "success",
      description: "Colección guardada con éxito",
    });
    clearSelected();
    updateColeccion({ id: newColeccion.id, values: newColeccion });
    setNewColeccion(null);
  };

  let contentToRender;

  if (!newColeccion)
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
  else if (newColeccion?.notas?.length === 0)
    contentToRender = (
      <Text fontSize="2xl">No hay notas en esta colección</Text>
    );
  else if (newColeccion.notas)
    contentToRender = newColeccion?.notas?.map(
      ({ id, nota, porcentaje, nombre }, index) => (
        <Nota
          key={id}
          id={id}
          index={index}
          nombre={nombre}
          nota={nota}
          porcentaje={porcentaje}
          deleteNota={deleteNota}
          updateNota={updateNota}
        />
      )
    );

  useEffect(() => {
    if (newColeccion?.notas) {
      calcularPromedioParcial();
    }
    if (newColeccion?.examen) {
      calcularPromedioFinal();
    }
  }, [newColeccion?.notas, newColeccion?.examen]);

  useEffect(() => {
    setNewColeccion(coleccion);
  }, [coleccion]);

  return (
    <>
      <Card
        gap="10px"
        alignItems="center"
        padding="12"
        width="50%"
        className="notas-container"
      >
        {newColeccion && (
          <>
            <ColeccionHeader
              coleccion={newColeccion}
              updateColeccion={updateNewColeccion}
            />
            <Center
              textAlign="center"
              color={colors.gray2}
              className="nota-container"
            >
              <Text width="120px" />
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
        {newColeccion && (
          <>
            <SumasNotas coleccion={newColeccion} />
            <MutateColeccion
              addExamen={addExamen}
              addNota={addNota}
              coleccion={newColeccion}
              deleteNota={deleteNota}
              updateNota={updateNota}
              saveColeccion={saveColeccion}
              deleteColeccion={deleteColeccion}
            />
          </>
        )}
      </Card>
      {newColeccion && <ResumenColeccion coleccion={newColeccion} />}
    </>
  );
}

export default FormPromedio;
