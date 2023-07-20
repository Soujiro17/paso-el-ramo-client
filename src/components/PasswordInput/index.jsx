import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

function PasswordInput({ rightElementWidth = "4.5rem", ...props }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup>
      <Input {...props} pr="5.5rem" type={show ? "text" : "password"} />
      <InputRightElement width={rightElementWidth} right="1">
        <Button h="1.75rem" onClick={handleClick}>
          {show ? "Ocultar" : "Mostrar"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default PasswordInput;
