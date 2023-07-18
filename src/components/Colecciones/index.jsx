import { Badge, Box, Card } from "@chakra-ui/react";
import Jdenticon from "react-jdenticon";
import { CloseIcon } from "@chakra-ui/icons";
import useAuth from "../../hooks/useAuth";
import AlertDialogComponent from "../AlertDialog";

function ColeccionItem({
  nombre = "",
  onClick,
  id,
  editing = false,
  deleteColeccion,
}) {
  return (
    <Box
      height="150px"
      width="300px"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Card height="100%" position="relative">
        <Card position="relative" zIndex="100">
          <Box
            height="32px"
            fontWeight="semibold"
            paddingLeft="2"
            lineHeight="tight"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              as="h4"
              maxWidth="70%"
              minWidth="70%"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              wordBreak="break-all"
            >
              {nombre}
            </Box>{" "}
            {editing ? (
              <Badge ml="1" mr="2">
                Editando...
              </Badge>
            ) : (
              <AlertDialogComponent
                iconButton
                onConfirm={deleteColeccion}
                buttonScheme="red"
                buttonSize="sm"
                title="Eliminar colección"
                description={`¿Deseas eliminar la colección <strong>${nombre}</strong>`}
                onConfirmMessage="Colección eliminada con éxito"
                onConfirmTitle="Eliminación exitosa"
                zIndexButton={200}
                icon={<CloseIcon />}
              />
            )}
          </Box>
        </Card>
        <Card
          width="300px"
          height="300px"
          position="absolute"
          inset="0"
          margin="auto"
          onClick={onClick}
        >
          <Jdenticon size="300" value={id} />
        </Card>
      </Card>
    </Box>
  );
}

function Colecciones({ setSelectedCollection, selectedCollection }) {
  const { colecciones, addColeccion, removeColeccion } = useAuth();

  return (
    <Box
      display="flex"
      gap="10px"
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      padding="5"
    >
      {colecciones.map((coleccion) => {
        const isEqual = coleccion.id === selectedCollection?.id;

        return (
          <ColeccionItem
            id={coleccion.id}
            onClick={() => setSelectedCollection(isEqual ? null : coleccion)}
            key={coleccion.id}
            nombre={coleccion.nombre || "Colección sin nombre *"}
            bgColor={coleccion.bgColor}
            deleteColeccion={() => removeColeccion(coleccion.id)}
            editing={isEqual}
          />
        );
      })}
      <Box
        key={0}
        height="150px"
        width="300px"
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        onClick={() => {
          const coleccion = addColeccion();
          setSelectedCollection(coleccion);
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        +
      </Box>
    </Box>
  );
}

export default Colecciones;
