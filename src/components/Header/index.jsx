import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  // useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
  Text,
  Input,
  FormLabel,
  InputGroup,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as LinkRouter } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function NavLink({ children, href = "" }) {
  return (
    <Link
      as={LinkRouter}
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      to={href}
    >
      {children}
    </Link>
  );
}

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  const { auth } = useAuth();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <LinkRouter to="/">
          <Box display="flex" alignItems="center">
            <Image
              height={70}
              width={120}
              objectFit="contain"
              src={
                colorMode === "light"
                  ? "/logo-nobg.png"
                  : "/logo-nobg-white.png"
              }
              alt="logo"
            />
            <Text>MIS NOTAS</Text>
          </Box>
        </LinkRouter>
        <Flex>
          <NavLink href="/">Inicio</NavLink>
          <NavLink href="/instrucciones">Instrucciones</NavLink>
          <NavLink href="/contacto">Contacto</NavLink>
        </Flex>
        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Menu>
              {auth ? (
                <>
                  <MenuButton
                    as={Button}
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                  >
                    <Avatar
                      size="sm"
                      src="https://avatars.dicebear.com/api/male/username.svg"
                    />
                  </MenuButton>
                  <MenuList alignItems="center" zIndex={200}>
                    <br />
                    <Center>
                      <Avatar
                        size="2xl"
                        src="https://avatars.dicebear.com/api/male/username.svg"
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Logout</MenuItem>
                  </MenuList>
                </>
              ) : (
                <>
                  <MenuButton
                    as={Button}
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                  >
                    Iniciar sesión
                  </MenuButton>
                  <MenuList
                    alignItems="center"
                    gap="10px"
                    zIndex={200}
                    padding="2"
                  >
                    <Flex flexDirection="column" gap="15px">
                      <InputGroup>
                        <Flex flexDirection="column">
                          <FormLabel margin={0} htmlFor="usuario">
                            Usuario
                          </FormLabel>
                          <Input id="usuario" placeholder="Usuario" />
                        </Flex>
                      </InputGroup>
                      <InputGroup>
                        <Flex flexDirection="column">
                          <FormLabel margin={0} htmlFor="password">
                            Contraseña
                          </FormLabel>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Contraseña"
                          />
                        </Flex>
                      </InputGroup>
                      <Button>Iniciar sesión</Button>
                    </Flex>
                  </MenuList>
                </>
              )}
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
