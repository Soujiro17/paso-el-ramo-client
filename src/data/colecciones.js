import { v4 as uuidv4 } from "uuid";
import colors from "../lib/colors";

export default [
  {
    id: uuidv4(),
    nombre: "Administración General",
    mismoPorcentaje: false,
    bgColor: colors.green.normal,
    examen: {
      id: uuidv4(),
      nota: 40,
      porcentaje: 30,
    },
    notas: [
      {
        id: uuidv4(),
        nota: 40,
        porcentaje: 30,
      },
      {
        id: uuidv4(),
        nota: 35,
        porcentaje: 15,
      },
    ],
  },
];
