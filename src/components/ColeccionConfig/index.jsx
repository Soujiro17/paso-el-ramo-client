import {
  Box,
  Center,
  FormLabel,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useCollectionStore } from "../../store";

function ColeccionConfig({ openSettings }) {
  const { notaMinima, notaMaxima, notaMinimaAprobacion } = useCollectionStore(
    (state) => state.selectedCollection
  );

  const handleCollectionValues = useCollectionStore(
    (state) => state.handleValuesSelected
  );

  const handleValues = (e) =>
    handleCollectionValues(e.target.name, e.target.value);

  return (
    <Box
      maxHeight={openSettings ? "250px" : 0}
      overflow="hidden"
      transition="all"
      transitionDuration="1s"
      className="config-container"
    >
      <Text fontSize="xl" textAlign="center" textTransform="uppercase">
        Configuración de la colección
      </Text>

      <Center
        width="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="20px"
      >
        <InputGroup width="50%" className="config-inputgroup-container">
          <FormLabel
            display="flex"
            alignItems="center"
            width="50%"
            margin={0}
            className="config-label"
          >
            Nota mínima:
          </FormLabel>
          <Input
            width="150px"
            name="notaMinima"
            type="number"
            onChange={handleValues}
            value={notaMinima}
            min={0}
            required
          />
        </InputGroup>
        <InputGroup width="50%" className="config-inputgroup-container">
          <FormLabel
            display="flex"
            alignItems="center"
            width="50%"
            margin={0}
            className="config-label"
          >
            Nota máxima:
          </FormLabel>
          <Input
            width="150px"
            name="notaMaxima"
            type="number"
            onChange={handleValues}
            value={notaMaxima}
            min={0}
            required
          />
        </InputGroup>
        <InputGroup width="50%" className="config-inputgroup-container">
          <FormLabel
            display="flex"
            alignItems="center"
            whiteSpace="pre-wrap"
            width="50%"
            margin={0}
            className="config-label"
          >
            Nota mínima de aprobación:
          </FormLabel>
          <Input
            width="150px"
            name="notaMinimaAprobacion"
            type="number"
            min={0}
            onChange={handleValues}
            value={notaMinimaAprobacion}
            required
          />
        </InputGroup>
      </Center>
    </Box>
  );
}

export default ColeccionConfig;
