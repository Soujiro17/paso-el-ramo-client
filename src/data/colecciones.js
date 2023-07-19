import { v4 as uuidv4 } from "uuid";

export default [
  {
    id: uuidv4(),
    nombre: "Administración General",
    mismoPorcentaje: false,
    notaMinimaAprobacion: 40,
    notaMinima: 10,
    notaMaxima: 70,
    promedioParcial: 0,
    promedioFinal: 0,
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
