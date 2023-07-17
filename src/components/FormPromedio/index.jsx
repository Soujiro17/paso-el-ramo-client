/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function FormPromedio() {
  const [notas, setNotas] = useState([]);
  const [promedio, setPromedio] = useState(0);

  const addNota = () =>
    setNotas((prev) => [
      ...prev,
      {
        id: uuidv4(),
        nota: "",
        porcentaje: "",
      },
    ]);

  const delNota = (id) =>
    setNotas((prev) => prev.filter((nota) => nota.id !== id));

  const updateNota = (ev, id) =>
    setNotas((prev) =>
      prev.map((nota) => {
        if (nota.id === id)
          return {
            ...nota,
            [ev.target.name]: ev.target.value,
          };

        return nota;
      })
    );

  const calcularPromedio = () => {
    const notasPonderadas = notas.reduce(
      (a, b) => a + b.nota * (b.porcentaje / 100),
      0
    );

    setPromedio(notasPonderadas / (notas.length || 1));
  };

  useEffect(() => {
    calcularPromedio();
  }, [notas, calcularPromedio]);

  return (
    <div>
      {notas.map(({ id, nota, porcentaje }, index) => (
        <div key={nota.id}>
          <label htmlFor={`nota${id}`}>Nota {index + 1}</label>
          <input
            type="number"
            min={0}
            name="nota"
            value={nota}
            onChange={(e) => updateNota(e, id)}
          />
          <input
            type="number"
            min={0}
            max={100}
            name="porcentaje"
            value={porcentaje}
            onChange={(e) => updateNota(e, id)}
          />
          <button onClick={() => delNota(id)}>Eliminar nota</button>
        </div>
      ))}
      <button onClick={addNota}>Añadir nota</button>
      <br />
      <div>Promedio: {promedio}</div>
      {JSON.stringify(notas)}
    </div>
  );
}

export default FormPromedio;
