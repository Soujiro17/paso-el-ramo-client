import ReactJdenticon from "react-jdenticon";
import { Badge, Box, Card } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
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
      minHeight="150px"
      minWidth="300px"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      className="coleccion-item"
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
          <ReactJdenticon size="300" value={id} />
        </Card>
      </Card>
    </Box>
  );
}

export default ColeccionItem;
