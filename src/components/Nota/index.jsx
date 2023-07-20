import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import CustomEditable from "../CustomEditable";

function Nota({
  nombre,
  index,
  id,
  nota,
  porcentaje,
  deleteNota,
  updateNota,
  notaMinima,
  notaMaxima,
}) {
  return (
    <Stack flexDirection="row" alignItems="center" className="nota-container">
      <CustomEditable
        value={nombre}
        defaultValue={`Nota ${index}`}
        name="nombre"
        fontSize="inherit"
        maxLength={30}
        onChange={(e) => updateNota(e, id)}
        width="120px"
        className="nota-nombre"
        required
      />
      <Input
        type="number"
        min={notaMinima}
        max={notaMaxima}
        name="nota"
        value={nota}
        onChange={(e) => updateNota(e, id)}
        className="input-nota"
        width="150px"
        required
      />
      <InputGroup width="150px" className="input-porcentaje">
        <Input
          type="number"
          min={0}
          max={100}
          name="porcentaje"
          value={porcentaje}
          onChange={(e) => updateNota(e, id)}
          required
        />
        <InputRightElement className="input-porcentaje-right">
          %
        </InputRightElement>
      </InputGroup>
      <IconButton
        colorScheme="red"
        onClick={() => deleteNota(id)}
        className="delete-nota"
        icon={<CloseIcon className="delete-nota-icon" />}
      />
    </Stack>
  );
}

export default Nota;
