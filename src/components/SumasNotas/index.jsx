import React from "react";

import { Center, Text } from "@chakra-ui/react";
import colors from "../../lib/colors";

function SumasNotas({ coleccion }) {
  return (
    <Center textAlign="center" color={colors.gray2} className="nota-container">
      <Text width="120px" className="nota-nombre custom-label-nombre">
        Sumas
      </Text>
      <Text width="150px" className="input-nota">
        {coleccion.notas.reduce((a, b) => a + Number(b.nota), 0)}
      </Text>
      <Text width="150px" className="input-porcentaje">
        {coleccion.notas.reduce((a, b) => a + Number(b.porcentaje), 0) / 100}%
      </Text>
    </Center>
  );
}

export default SumasNotas;
