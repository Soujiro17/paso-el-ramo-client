import React from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import Nota from "../Nota";
import AlertDialogComponent from "../AlertDialog";

function MutateColeccion({
  coleccion,
  addNota,
  deleteNota,
  updateNota,
  addExamen,
  deleteColeccion,
  saveColeccion,
}) {
  return (
    <>
      <Button colorScheme="blue" onClick={addNota}>
        Añadir nota
      </Button>
      <Box width="100%" mt="2">
        <Divider />
      </Box>
      <Flex flexDirection="column" textAlign="center" gap="10px">
        <Text fontSize="2xl">¿Das exámen?</Text>
        {coleccion.examen ? (
          <Nota
            key={0}
            nombre="Exámen"
            id="examen"
            nota={coleccion.examen.nota}
            porcentaje={coleccion.examen.porcentaje}
            deleteNota={deleteNota}
            updateNota={updateNota}
            min={coleccion.notaMinima}
            max={coleccion.notaMaxima}
          />
        ) : (
          <Button onClick={addExamen}>Agregar exámen</Button>
        )}
      </Flex>
      <Box width="100%" mt="2">
        <Divider />
      </Box>

      <Stack display="flex" gap="10px" marginTop="20px" width="100%">
        <Center gap="10px" className="mutate-buttons">
          <Button colorScheme="green" onClick={saveColeccion}>
            Guardar colección
          </Button>
          <AlertDialogComponent
            onConfirm={deleteColeccion}
            buttonText="Eliminar colección"
            confirmText="Eliminar"
            description={`¿Deseas eliminar la colección <strong>${coleccion.nombre}</strong>?`}
            title="Eliminar colección"
          />
        </Center>
      </Stack>
    </>
  );
}

export default MutateColeccion;
