import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";

function Nota({ nombre, index, id, onChange, nota, porcentaje, deleteNota }) {
  return (
    <Stack flexDirection="row" alignItems="center">
      <Text>{nombre || `Nota ${index}`}</Text>
      <Input
        type="number"
        min={0}
        name="nota"
        value={nota}
        onChange={(e) => onChange(e, id)}
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
          onChange={(e) => onChange(e, id)}
          placeholder="Porcentaje"
        />
        <InputRightElement>%</InputRightElement>
      </InputGroup>
      <Button colorScheme="red" onClick={() => deleteNota(id)}>
        Eliminar nota
      </Button>
    </Stack>
  );
}

export default Nota;
