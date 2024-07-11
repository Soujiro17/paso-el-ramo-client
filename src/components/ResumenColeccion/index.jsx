import React from "react";
import { Badge, Box, Flex, useColorMode } from "@chakra-ui/react";

function ResumenColeccion({ coleccion }) {
  const { colorMode } = useColorMode();

  return (
    <Box
      width="100%"
      position="fixed"
      bottom="0"
      left="0"
      borderTop="1px"
      borderBlockEndStyle="solid"
      borderColor={colorMode === "light" ? "#171923f2" : "#ffffffeb"}
      bgColor={colorMode === "light" ? "#ffffffeb" : "#171923f2"}
      className="resumen-wrapper"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        gap="15px"
        p="2"
        fontSize="2xl"
        className="resumen-container"
      >
        <Flex flexDirection="column" textAlign="center">
          Promedio parcial
          <Badge
            colorScheme={
              coleccion?.notaMinimaAprobacion > coleccion?.promedioParcial
                ? "red"
                : "green"
            }
            fontSize="2xl"
            className="resumen-badge"
          >
            {coleccion?.promedioParcial?.toFixed(2) || 0}
          </Badge>
        </Flex>
        {coleccion?.examen && (
          <Flex flexDirection="column" textAlign="center">
            Promedio final
            <Badge
              colorScheme={
                coleccion?.notaMinimaAprobacion > coleccion?.promedioFinal
                  ? "red"
                  : "green"
              }
              fontSize="2xl"
              className="resumen-badge"
            >
              {coleccion?.promedioFinal?.toFixed(2) || 0}
            </Badge>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default ResumenColeccion;
