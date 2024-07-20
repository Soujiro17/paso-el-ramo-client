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

function MutateColeccion() {
  const {
    addNota,
    mutateSaveCollection,
    mutateRemoveCollection,
    selectedCollection,
  } = useCollections();

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
        {selectedCollection.examen ? (
          <Nota
            nombre="Exámen"
            id={selectedCollection.examen.id}
            nota={selectedCollection.examen.nota}
            porcentaje={selectedCollection.examen.porcentaje}
            min={selectedCollection.notaMinima}
            max={selectedCollection.notaMaxima}
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
          <Button colorScheme="green" onClick={mutateSaveCollection}>
            Guardar colección
          </Button>
          <AlertDialogComponent
            onConfirm={() =>
              mutateRemoveCollection({
                id: selectedCollection.id,
                synced: selectedCollection.synced,
              })
            }
            buttonText="Eliminar colección"
            confirmText="Eliminar"
            description={`¿Deseas eliminar la colección <strong>${selectedCollection.nombre}</strong>?`}
            title="Eliminar colección"
          />
        </Center>
      </Stack>
    </>
  );
}

export default MutateColeccion;
