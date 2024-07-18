import React from "react";
import { Badge, Box, Flex, Text, useColorMode } from "@chakra-ui/react";

function PromedioResult({ text = "", promedio = 0, notaMinimaAprobacion }) {
  const getSchemaColor = (promedio) => {
    return notaMinimaAprobacion > promedio ? "red" : "green";
  };

  return (
    <Flex flexDirection="column" textAlign="center">
      <Text px="2" fontSize="md">
        {text?.toUpperCase()}
      </Text>
      <Badge
        colorScheme={getSchemaColor(promedio)}
        fontSize="2xl"
        className="resumen-badge"
      >
        {promedio.toFixed(2)}
      </Badge>
    </Flex>
  );
}

function ResumenColeccion({
  promedioFinal,
  promedioParcial,
  notaMinimaAprobacion,
  examen,
}) {
  const { colorMode } = useColorMode();

  return (
    <Box
      width="100%"
      position="fixed"
      bottom="0"
      left="0"
      borderTop="1px"
      borderBlockEndStyle="solid"
      borderColor={colorMode === "light" ? "rgb(23 25 35 / 99%)" : "#ffffffeb"}
      bgColor={colorMode === "light" ? "#ffffffeb" : "rgb(23 25 35 / 99%)"}
      className="resumen-wrapper"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        gap="30px"
        p="2"
        fontSize="2xl"
        className="resumen-container"
      >
        <PromedioResult
          notaMinimaAprobacion={notaMinimaAprobacion}
          promedio={promedioParcial}
          text="Promedio parcial"
        />
        {examen && (
          <PromedioResult
            notaMinimaAprobacion={notaMinimaAprobacion}
            promedio={promedioFinal}
            text="Promedio final"
          />
        )}
      </Flex>
    </Box>
  );
}

export default ResumenColeccion;
