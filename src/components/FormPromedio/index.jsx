/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Card,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../../hooks/useAuth";

function FormPromedio({ coleccion, clearSelected }) {
  const [newColeccion, setNewColeccion] = useState({});
  const [promedio, setPromedio] = useState(0);

  const { updateColeccion } = useAuth();

  const addNota = () =>
    setNewColeccion((prev) => ({
      ...prev,
      notas: [
        ...prev.notas,
        {
          id: uuidv4(),
          nombre: `Nota ${newColeccion.notas.length}`,
          nota: "",
          porcentaje: "",
        },
      ],
    }));

  const delNota = (id) =>
    setNewColeccion((prev) => ({
      ...prev,
      notas: newColeccion.notas.filter((nota) => nota.id !== id),
    }));

  const updateNota = (ev, id) =>
    setNewColeccion((prev) => ({
      ...prev,
      notas: newColeccion.map((nota) => {
        if (nota.id === id)
          return { ...nota, [ev.target.name]: ev.target.value };

        return nota;
      }),
    }));

  const calcularPromedio = () => {
    const notasPonderadas = newColeccion.notas?.reduce(
      (a, b) => a + b.nota * (b.porcentaje / 100),
      0
    );

    setPromedio(notasPonderadas / (newColeccion.notas?.length || 1));
  };

  const onClickSave = () => {
    toast.success("Colección salvada con éxito");
    clearSelected();
    updateColeccion({ id: newColeccion.id, values: newColeccion });
    setNewColeccion({});
  };

  useEffect(() => {
    calcularPromedio();
  }, [newColeccion.notas, calcularPromedio]);

  useEffect(() => {
    if (coleccion) {
      setNewColeccion(coleccion);
    }
  }, [coleccion]);

  return (
    <Card gap="10px" alignItems="center" padding="12">
      {newColeccion.nombre && <Text>Editando {newColeccion.nombre}...</Text>}
      {newColeccion.notas?.length > 0 ? (
        newColeccion.notas.map(({ id, nota, porcentaje, nombre }, index) => (
          <Stack flexDirection="row" alignItems="center" key={id}>
            <Text>{nombre || `Nota ${index}`}</Text>
            <Input
              type="number"
              min={0}
              name="nota"
              value={nota}
              onChange={(e) => updateNota(e, id)}
              placeholder="Nota"
              width="150px"
            />
            <InputGroup width="150px">
              <Input
                type="number"
                min={0}
                max={100}
                name="porcentaje"
                value={porcentaje}
                onChange={(e) => updateNota(e, id)}
                placeholder="Porcentaje"
              />
              <InputRightElement>%</InputRightElement>
            </InputGroup>
            <Button colorScheme="red" onClick={() => delNota(id)}>
              Eliminar nota
            </Button>
          </Stack>
        ))
      ) : (
        <Text>No hay notas en esta colección</Text>
      )}

      {newColeccion && (
        <Box
          display="flex"
          gap="10px"
          marginTop="50px"
          alignItems="center"
          justifyContent="center"
        >
          <Button colorScheme="green" onClick={addNota}>
            Añadir nota
          </Button>
          <Button colorScheme="blue" onClick={onClickSave}>
            Guardar colección
          </Button>
        </Box>
      )}
      {/* <br /> */}
      {/* <div>Promedio: {promedio}</div> */}
      {/* {JSON.stringify(notas)} */}
    </Card>
  );
}

export default FormPromedio;
