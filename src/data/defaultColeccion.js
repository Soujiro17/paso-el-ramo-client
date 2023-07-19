import { v4 as uuidv4 } from "uuid";

export default {
  nombre: "Nueva colección",
  mismoPorcentaje: false,
  notaMinimaAprobacion: 40,
  notaMaxima: 70,
  promedioParcial: 0,
  promedioFinal: 0,
  examen: null,
  notas: [
    {
      id: uuidv4(),
      nombre: "Nota 1",
      nota: "",
      porcentaje: "",
    },
  ],
};
