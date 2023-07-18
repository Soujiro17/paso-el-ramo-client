import { Badge, Box, Card } from "@chakra-ui/react";
import Jdenticon from "react-jdenticon";
import useAuth from "../../hooks/useAuth";

function ColeccionItem({ nombre = "", onClick, id, editing = false }) {
  return (
    <Box
      height="150px"
      width="300px"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={onClick}
    >
      <Card height="100%" position="relative">
        <Card position="relative" zIndex="100">
          <Box
            fontWeight="semibold"
            paddingLeft="2"
            paddingRight="2"
            lineHeight="tight"
            display="flex"
            alignItems="center"
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
            {editing && <Badge ml="1">Editando...</Badge>}
          </Box>
        </Card>
        <Card
          width="300px"
          height="300px"
          position="absolute"
          inset="0"
          margin="auto"
        >
          <Jdenticon size="300" value={id} />
        </Card>
      </Card>
    </Box>
  );
}

function Colecciones({ setSelectedCollection, selectedCollection }) {
  const { colecciones, addColeccion } = useAuth();

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
            nombre={coleccion.nombre}
            bgColor={coleccion.bgColor}
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
