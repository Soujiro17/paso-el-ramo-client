/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Center, Highlight, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../../hooks/useAuth";
import Nota from "../Nota";
import colors from "../../lib/colors";
import ColeccionHeader from "../ColeccionHeader";
import SumasNotas from "../SumasNotas";
import MutateColeccion from "../MutateColeccion";
import ResumenColeccion from "../ResumenColeccion";

function FormPromedio({ coleccion, clearSelected }) {
  const [newColeccion, setNewColeccion] = useState(null);

  const { updateColeccion, removeColeccion, auth } = useAuth();

  const toast = useToast();

  const addNota = () =>
    setNewColeccion((prev) => ({
      ...prev,
      notas: [
        ...prev.notas,
        {
          id: uuidv4(),
          nombre: `Nota ${newColeccion.notas.length + 1}`,
          nota: 0,
          porcentaje: 0,
        },
      ],
    }));

  const deleteNota = (id) => {
    if (id === "examen") {
      setNewColeccion((prev) => ({
        ...prev,
        examen: null,
      }));

      return;
    }

    setNewColeccion((prev) => ({
      ...prev,
      notas: newColeccion.notas.filter((nota) => nota.id !== id),
    }));
  };

  const updateNota = (ev, id) => {
    if (id === "examen") {
      setNewColeccion((prev) => ({
        ...prev,
        examen: { ...prev.examen, [ev.target.name]: ev.target.value },
      }));

      return;
    }

    setNewColeccion((prev) => ({
      ...prev,
      notas: newColeccion.notas.map((nota) => {
        if (nota.id === id)
          return { ...nota, [ev.target.name]: ev.target.value };

        return nota;
      }),
    }));
  };

  const updateNewColeccion = (ev) =>
    setNewColeccion((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));

  const addExamen = () =>
    setNewColeccion((prev) => ({
      ...prev,
      examen: {
        id: uuidv4(),
        nombre: "Exámen",
        nota: 0,
        porcentaje: 0,
      },
    }));

  const calcularPromedioParcial = () => {
    const notasPonderadas = newColeccion?.notas?.reduce(
      (a, b) => a + b.nota * (b.porcentaje / 100),
      0
    );

    setNewColeccion((prev) => ({
      ...prev,
      promedioParcial: notasPonderadas,
    }));
  };

  const calcularPromedioFinal = () => {
    setNewColeccion((prev) => ({
      ...prev,
      promedioFinal:
        prev.promedioParcial * (1 - prev.examen?.porcentaje || 0 / 100) +
        (prev.examen?.nota || 0 * prev.examen?.porcentaje || 0) / 100,
    }));
  };

  const deleteColeccion = async () => {
    const res = await removeColeccion({
      id: newColeccion.id,
      saved: newColeccion.saved,
    });
    if (!res) return;
    setNewColeccion(null);
  };

  const saveColeccion = async () => {
    if (!auth) {
      toast({
        status: "error",
        title: "Error al guardar",
        description:
          "No puedes guardar una colección sin haber iniciado sesión antes",
      });

      return;
    }

    const res = await updateColeccion({
      id: newColeccion.id,
      values: newColeccion,
    });

    if (!res) return;
    clearSelected();
    setNewColeccion(null);
  };

  let contentToRender;

  if (!newColeccion)
    contentToRender = (
      <Text fontSize="2xl" className="seleccionar-coleccion">
        <Highlight
          query="Selecciona"
          styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
        >
          Selecciona una colección para editar
        </Highlight>
      </Text>
    );
  else if (newColeccion?.notas?.length === 0)
    contentToRender = (
      <Text fontSize="2xl">No hay notas en esta colección</Text>
    );
  else if (newColeccion.notas)
    contentToRender = newColeccion?.notas?.map(
      ({ id, nota, porcentaje, nombre }, index) => (
        <Nota
          key={id}
          id={id}
          index={index}
          nombre={nombre}
          nota={nota}
          porcentaje={porcentaje}
          deleteNota={deleteNota}
          updateNota={updateNota}
        />
      )
    );

  useEffect(() => {
    if (newColeccion?.notas) {
      calcularPromedioParcial();
    }
    if (newColeccion?.examen) {
      calcularPromedioFinal();
    }
  }, [newColeccion?.notas, newColeccion?.examen, calcularPromedioParcial]);

  useEffect(() => {
    setNewColeccion(coleccion);
  }, [coleccion]);

  useEffect(() => {
    if (!auth) {
      clearSelected();
      setNewColeccion(null);
    }
  }, [auth]);

  return (
    <>
      <Card
        gap="10px"
        alignItems="center"
        padding="12"
        width="50%"
        className="notas-container"
      >
        {newColeccion && (
          <>
            <ColeccionHeader
              coleccion={newColeccion}
              updateColeccion={updateNewColeccion}
            />
            <Center
              textAlign="center"
              color={colors.gray2}
              className="nota-container"
            >
              <Text width="120px" className="nota-nombre custom-label-nombre" />
              <Text width="150px" className="input-nota">
                Nota
              </Text>
              <Text width="150px" className="input-porcentaje">
                Porcentaje
              </Text>
            </Center>
          </>
        )}
        {contentToRender}
        {newColeccion && (
          <>
            <SumasNotas coleccion={newColeccion} />
            <MutateColeccion
              addExamen={addExamen}
              addNota={addNota}
              coleccion={newColeccion}
              deleteNota={deleteNota}
              updateNota={updateNota}
              saveColeccion={saveColeccion}
              deleteColeccion={deleteColeccion}
            />
          </>
        )}
      </Card>
      {newColeccion && <ResumenColeccion coleccion={newColeccion} />}
    </>
  );
}

export default FormPromedio;
