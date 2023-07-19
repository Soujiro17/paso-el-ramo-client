import {
  Box,
  Center,
  Divider,
  FormLabel,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import React from "react";

function ColeccionConfig({ openSettings, coleccion, updateColeccion }) {
  return (
    <Box
      maxHeight={openSettings ? "200px" : 0}
      overflow="hidden"
      transition="all"
      transitionDuration="1s"
    >
      <Divider />
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
        <InputGroup width="50%">
          <FormLabel display="flex" alignItems="center" width="50%" margin={0}>
            Nota mínima:
          </FormLabel>
          <Input
            width="150px"
            name="notaMinima"
            type="number"
            onChange={updateColeccion}
            value={coleccion.notaMinima}
          />
        </InputGroup>
        <InputGroup width="50%">
          <FormLabel display="flex" alignItems="center" width="50%" margin={0}>
            Nota máxima:
          </FormLabel>
          <Input
            width="150px"
            name="notaMaxima"
            type="number"
            onChange={updateColeccion}
            value={coleccion.notaMaxima}
          />
        </InputGroup>
        <InputGroup width="50%">
          <FormLabel
            display="flex"
            alignItems="center"
            whiteSpace="pre-wrap"
            width="50%"
            margin={0}
          >
            Nota mínima de aprobación:
          </FormLabel>
          <Input
            width="150px"
            name="notaMinimaAprobacion"
            type="number"
            onChange={updateColeccion}
            value={coleccion.notaMinimaAprobacion}
          />
        </InputGroup>
      </Center>
    </Box>
  );
}

export default ColeccionConfig;
