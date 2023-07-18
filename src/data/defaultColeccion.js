import { v4 as uuidv4 } from "uuid";

export default {
  nombre: "Nueva colección",
  notas: [
    {
      nombre: "Nota 1",
      id: uuidv4(),
      nota: "",
      porcentaje: "",
    },
  ],
  examen: null,
};
