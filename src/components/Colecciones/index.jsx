import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import ColeccionItem from "../ColeccionItem";

function Colecciones({ setSelectedCollection, selectedCollection }) {
  const { colecciones, addColeccion, removeColeccion } = useAuth();

  return (
    <Box
      display="flex"
      gap="10px"
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      padding="5"
      className="colecciones-container"
    >
      {colecciones.map((coleccion) => {
        const isEqual = coleccion.id === selectedCollection?.id;

        return (
          <ColeccionItem
            key={coleccion.id}
            id={coleccion.id}
            onClick={() => setSelectedCollection(isEqual ? null : coleccion)}
            nombre={coleccion.nombre || "Colección sin nombre *"}
            bgColor={coleccion.bgColor}
            deleteColeccion={() =>
              removeColeccion({ id: coleccion.id, saved: coleccion.saved })
            }
            editing={isEqual}
          />
        );
      })}
      <Box
        key={0}
        height="150px"
        width="300px"
        minHeight="150px"
        minWidth="300px"
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        onClick={() => {
          const coleccion = addColeccion();
          setSelectedCollection(coleccion);
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="6xl"
        textAlign="center"
        bg={useColorModeValue("gray.100", "gray.1000")}
        className="coleccion-item"
      >
        <Stack>
          <span>+</span>
          <Text margin="0" fontSize="initial">
            Nueva colección
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}

export default Colecciones;
