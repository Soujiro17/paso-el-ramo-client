import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import CustomEditable from "../CustomEditable";

function Nota({ nombre, index, id, nota, porcentaje, deleteNota, updateNota }) {
  return (
    <Stack flexDirection="row" alignItems="center">
      <CustomEditable
        value={nombre}
        defaultValue={`Nota ${index}`}
        name="nombre"
        fontSize="inherit"
        maxLength={30}
        onChange={(e) => updateNota(e, id)}
        width="120px"
      />
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
      <IconButton
        colorScheme="red"
        onClick={() => deleteNota(id)}
        icon={<CloseIcon />}
      />
    </Stack>
  );
}

export default Nota;
