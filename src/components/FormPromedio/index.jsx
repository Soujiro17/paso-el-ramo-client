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
  Highlight,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../../hooks/useAuth";
import Nota from "../Nota";
import AlertDialogComponent from "../AlertDialog";

function FormPromedio({ coleccion, clearSelected }) {
  const [newColeccion, setNewColeccion] = useState(null);
  const [promedio, setPromedio] = useState(0);

  const toast = useToast();

  const { updateColeccion, removeColeccion } = useAuth();

  const addNota = () =>
    setNewColeccion((prev) => ({
      ...prev,
      notas: [
        ...prev.notas,
        {
          id: uuidv4(),
          nombre: `Nota ${newColeccion.notas.length}`,
          nota: "",
          porcentaje: "",
        },
      ],
    }));

  const delNota = (id) =>
    setNewColeccion((prev) => ({
      ...prev,
      notas: newColeccion.notas.filter((nota) => nota.id !== id),
    }));

  const updateNota = (ev, id) =>
    setNewColeccion((prev) => ({
      ...prev,
      notas: newColeccion.map((nota) => {
        if (nota.id === id)
          return { ...nota, [ev.target.name]: ev.target.value };

        return nota;
      }),
    }));

  const calcularPromedio = () => {
    const notasPonderadas = newColeccion?.notas?.reduce(
      (a, b) => a + b.nota * (b.porcentaje / 100),
      0
    );

    setPromedio(notasPonderadas / (newColeccion?.notas?.length || 1));
  };

  const onDeleteColeccion = () => {
    toast({
      status: "success",
      description: "Colección eliminada con éxito",
    });
    removeColeccion(newColeccion.id);
    setNewColeccion(null);
  };

  const onClickSave = () => {
    toast({
      status: "success",
      description: "Colección guardada con éxito",
    });
    clearSelected();
    updateColeccion({ id: newColeccion.id, values: newColeccion });
    setNewColeccion(null);
  };

  useEffect(() => {
    calcularPromedio();
  }, [newColeccion?.notas, calcularPromedio]);

  useEffect(() => {
    setNewColeccion(coleccion);
  }, [coleccion]);

  let contentToRender;

  if (!newColeccion)
    contentToRender = (
      <Text fontSize="2xl">
        <Highlight
          query="Selecciona"
          styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
        >
          Selecciona una colección para editar
        </Highlight>
      </Text>
    );
  else if (newColeccion?.notas.length === 0)
    contentToRender = (
      <Text fontSize="2xl">No hay notas en esta colección</Text>
    );
  else
    contentToRender = newColeccion?.notas.map(
      ({ id, nota, porcentaje, nombre }, index) => (
        <Nota
          key={id}
          id={id}
          index={index}
          nombre={nombre}
          nota={nota}
          porcentaje={porcentaje}
          deleteNota={delNota}
          onChange={updateNota}
        />
      )
    );

  return (
    <Card gap="10px" alignItems="center" padding="12" width="50%">
      {newColeccion?.nombre && (
        <Box
          width="100%"
          display="flex"
          gap="10px"
          flexDirection="column"
          mb="2"
        >
          <Divider />
          <Text
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="10px"
            fontSize="2xl"
          >
            Editando <Badge fontSize="2xl">{newColeccion.nombre}...</Badge>
          </Text>
          <Divider />
        </Box>
      )}
      {contentToRender}
      {newColeccion && (
        <Stack display="flex" gap="10px" marginTop="50px">
          <Button colorScheme="green" onClick={addNota}>
            Añadir nota
          </Button>
          <Center gap="10px">
            <Button colorScheme="blue" onClick={onClickSave}>
              Guardar colección
            </Button>
            <AlertDialogComponent
              onConfirm={onDeleteColeccion}
              buttonText="Eliminar colección"
              confirmText="Eliminar"
              description={`¿Deseas eliminar la colección <strong>${newColeccion.nombre}</strong>?`}
              title="Eliminar colección"
            />
          </Center>
        </Stack>
      )}
    </Card>
  );
}

export default FormPromedio;
