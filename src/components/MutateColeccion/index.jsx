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
import useCollections from "../../hooks/useCollections";

function MutateColeccion({ nombre, notaMaxima, notaMinima, examen }) {
  const { addNota, saveCollection, mutateRemoveCollection } = useCollections();

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
        {examen ? (
          <Nota
            nombre="Exámen"
            id={examen.id}
            nota={examen.nota}
            porcentaje={examen.porcentaje}
            min={notaMinima}
            max={notaMaxima}
            type="examen"
          />
        ) : (
          <Button onClick={() => addNota("examen")}>Agregar exámen</Button>
        )}
      </Flex>
      <Box width="100%" mt="2">
        <Divider />
      </Box>

      <Stack display="flex" gap="10px" marginTop="20px" width="100%">
        <Center gap="10px" className="mutate-buttons">
          <Button colorScheme="green" onClick={saveCollection}>
            Guardar colección
          </Button>
          <AlertDialogComponent
            onConfirm={mutateRemoveCollection}
            buttonText="Eliminar colección"
            confirmText="Eliminar"
            description={`¿Deseas eliminar la colección <strong>${nombre}</strong>?`}
            title="Eliminar colección"
          />
        </Center>
      </Stack>
    </>
  );
}

export default MutateColeccion;
