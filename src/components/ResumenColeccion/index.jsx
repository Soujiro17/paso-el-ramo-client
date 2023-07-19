import React from "react";
import { Badge, Box, Flex } from "@chakra-ui/react";
import colors from "../../lib/colors";

function ResumenColeccion({ coleccion }) {
  return (
    <Box
      width="100%"
      position="fixed"
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
              coleccion?.notaMinimaAprobacion > coleccion?.promedioParcial
                ? "red"
                : "green"
            }
            fontSize="2xl"
          >
            {coleccion?.promedioParcial?.toFixed(2)}
          </Badge>
        </Flex>
        {coleccion?.examen && (
          <Flex flexDirection="column" textAlign="center">
            Promedio final
            <Badge
              colorScheme={
                coleccion.notaMinimaAprobacion > coleccion.promedioFinal
                  ? "red"
                  : "green"
              }
              fontSize="2xl"
            >
              {coleccion?.promedioFinal?.toFixed(2)}
            </Badge>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default ResumenColeccion;
