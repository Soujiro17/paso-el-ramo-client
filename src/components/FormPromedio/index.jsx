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
import CustomEditable from "../CustomEditable";
import colors from "../../lib/colors";

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

  const delNota = (id) =>
    setNewColeccion((prev) => ({
      ...prev,
      notas: newColeccion.notas.filter((nota) => nota.id !== id),
    }));

  const updateNota = (ev, id) =>
    setNewColeccion((prev) => ({
      ...prev,
      notas: newColeccion.notas.map((nota) => {
        if (nota.id === id)
          return { ...nota, [ev.target.name]: ev.target.value };

        return nota;
      }),
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

  const onEditColeccion = (e) =>
    setNewColeccion((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onDeleteColeccion = () => {
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
          deleteNota={delNota}
          onChange={(e) => updateNota(e, id)}
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
      <Card gap="10px" alignItems="center" padding="12" width="50%">
        {newColeccion && (
          <Box
            width="100%"
            display="flex"
            gap="10px"
            flexDirection="column"
            maxWidth="100%"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            wordBreak="break-all"
            mb="2"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="10px"
              fontSize="2xl"
            >
              Editando{" "}
              <CustomEditable
                value={newColeccion?.nombre}
                name="nombre"
                maxLength={30}
                onChange={onEditColeccion}
                defaultValue="Colección sin nombre *"
                badge
              />
            </Box>
            <Divider />
          </Box>
        )}
        {contentToRender}
        {newColeccion && (
          <Stack display="flex" gap="10px" marginTop="50px">
            <Button colorScheme="blue" onClick={addNota}>
              Añadir nota
            </Button>
            <Center gap="10px">
              <Button colorScheme="green" onClick={onClickSave}>
                Guardar colección
              </Button>
              <AlertDialogComponent
                onConfirm={onDeleteColeccion}
                buttonText="Eliminar colección"
                confirmText="Eliminar"
                description={`¿Deseas eliminar la colección <strong>${newColeccion.nombre}</strong>?`}
                title="Eliminar colección"
                onConfirmMessage="Colección eliminada con éxito"
                onConfirmTitle="Eliminación exitosa"
              />
            </Center>
          </Stack>
        )}
      </Card>
      {newColeccion && (
        <Box
          width="100%"
          position="absolute"
          bottom="0"
          left="0"
          bgColor={colors.gray}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            gap="15px"
            p="2"
            fontSize="2xl"
          >
            <Flex flexDirection="column" textAlign="center">
              Promedio parcial
              <Badge
                colorScheme={
                  newColeccion?.notaMinimaAprobacion >
                  newColeccion?.promedioParcial
                    ? "red"
                    : "green"
                }
                fontSize="2xl"
              >
                {newColeccion?.promedioParcial}
              </Badge>
            </Flex>
            {newColeccion?.examen && (
              <Flex flexDirection="column" textAlign="center">
                Promedio final
                <Badge
                  colorScheme={
                    newColeccion.notaMinimaAprobacion >
                    newColeccion.promedioFinal
                      ? "red"
                      : "green"
                  }
                  fontSize="2xl"
                >
                  {newColeccion?.promedioFinal}
                </Badge>
              </Flex>
            )}
          </Flex>
        </Box>
      )}
    </>
  );
}

export default FormPromedio;
