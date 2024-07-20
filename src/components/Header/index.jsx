/* eslint-disable react/no-unknown-property */
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Input,
  FormLabel,
  Text,
  Badge,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as LinkRouter } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useMidMutation from "../../hooks/useMidMutation";
import useAuth from "../../hooks/useAuth";
import { login, logout, signUp } from "../../app/api/auth";
import PasswordInput from "../PasswordInput";

// function NavLink({ children, href = "" }) {
//   return (
//     <Link
//       as={LinkRouter}
//       px={2}
//       py={1}
//       rounded="md"
//       _hover={{
//         textDecoration: "none",
//         bg: useColorModeValue("gray.200", "gray.700"),
//       }}
//       to={href}
//     >
//       {children}
//     </Link>
//   );
// }

function Header() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();

  const handleIsCreating = () => setIsCreating(!isCreating);

  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const { auth, setAuth, setUser, user, resetAll } = useAuth();

  const { mutateAsync: mutateLogin } = useMidMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onSuccessCallback: (data) => {
      setAuth(data.accessToken);
      setUser(data.user);
    },
  });

  const { mutateAsync: mutateSignUp } = useMidMutation({
    mutationFn: signUp,
    mutationKey: ["signUp"],
    onSuccessCallback: (data) => {
      setAuth(data.accessToken);
      setUser(data.user);
    },
  });

  const { refetch } = useQuery({
    queryFn: logout,
    queryKey: ["logout"],
    enabled: false,
  });

  const onClickLogout = () => {
    refetch();
    resetAll();
  };

  const onClickLogin = async (e) => {
    e.preventDefault();

    if (isCreating) await mutateSignUp({ email, password });

    await mutateLogin({ email, password });
  };

  // const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      minHeight="7vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      px={{ base: 4, md: 10 }}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <LinkRouter to="/">
          <Box display="flex" alignItems="center">
            <img
              height={70}
              width={120}
              fetchpriority="high"
              src={
                colorMode === "light"
                  ? "/logo-nobg.webp"
                  : "/logo-nobg-whiteblue.webp"
              }
              alt="Logo Paso El Ramo"
            />
            {/* <Text>PASO EL RAMO</Text> */}
          </Box>
        </LinkRouter>
        {/* <Flex>
          <NavLink href="/">Inicio</NavLink>
          <NavLink href="/instrucciones">Instrucciones</NavLink>
          <NavLink href="/contacto">Contacto</NavLink>
        </Flex> */}
        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            <Button
              onClick={toggleColorMode}
              aria-label="Activar Modo Nocturno"
            >
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
                      src="https://api.dicebear.com/9.x/shapes/svg?seed=Aneka"
                    />
                  </MenuButton>
                  <MenuList alignItems="center" zIndex={200}>
                    <br />
                    <Center>
                      <Avatar
                        size="2xl"
                        src="https://api.dicebear.com/9.x/shapes/svg?seed=Aneka"
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{user?.email}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem onClick={onClickLogout}>Logout</MenuItem>
                  </MenuList>
                </>
              ) : (
                <>
                  <MenuButton
                    as={Button}
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    color="gray.700"
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
                    <form
                      onSubmit={
                        isCreating && confirmPassword !== password
                          ? null
                          : onClickLogin
                      }
                    >
                      <Flex flexDirection="column" gap="15px">
                        <Flex flexDirection="column">
                          <FormLabel margin={0} htmlFor="email">
                            Email
                          </FormLabel>
                          <Input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmail}
                          />
                        </Flex>
                        <Flex flexDirection="column">
                          <FormLabel margin={0} htmlFor="password">
                            Contraseña
                          </FormLabel>
                          <PasswordInput
                            id="password"
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={handlePassword}
                          />
                        </Flex>
                        {isCreating && (
                          <Flex flexDirection="column">
                            <FormLabel margin={0} htmlFor="confirmPassword">
                              Repite la contraseña
                            </FormLabel>
                            <PasswordInput
                              id="password"
                              type="confirmPassword"
                              placeholder="Repite la contraseña"
                              value={confirmPassword}
                              onChange={handleConfirmPassword}
                            />
                          </Flex>
                        )}
                        {isCreating && confirmPassword !== password && (
                          <Badge colorScheme="red">
                            Las contraseñas no coinciden
                          </Badge>
                        )}
                        <Input type="submit" as={Button}>
                          {isCreating ? "Registrarse" : "Iniciar sesión"}
                        </Input>
                        <Box textAlign="center">
                          {isCreating
                            ? "¿Ya posees una cuenta?"
                            : "¿No tienes cuenta?"}
                          <Text
                            fontWeight="bold"
                            onClick={handleIsCreating}
                            cursor="pointer"
                          >
                            {isCreating ? "¡inicia sesión!" : " ¡regístrate!"}
                          </Text>
                        </Box>
                      </Flex>
                    </form>
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
