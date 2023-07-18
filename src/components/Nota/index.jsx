import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import CustomEditable from "../CustomEditable";

function Nota({ nombre, index, id, onChange, nota, porcentaje, deleteNota }) {
  return (
    <Stack flexDirection="row" alignItems="center">
      <CustomEditable
        value={nombre || `Nota ${index}`}
        name="nombre"
        maxLength={30}
        onChange={onChange}
        fontSize=""
        width="120px"
      />
      <Input
        type="number"
        min={0}
        name="nota"
        value={nota}
        onChange={onChange}
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
          onChange={onChange}
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
