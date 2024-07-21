import React, { useState } from "react";
import { Box, Divider } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import CustomEditable from "../CustomEditable";
import ColeccionConfig from "../ColeccionConfig";

function ColeccionHeader({ nombre, handleValues }) {
  const [openSettings, setOpenSettings] = useState(false);

  const handleOpenSettings = () => setOpenSettings(!openSettings);
  const handleCollectionValues = (e) =>
    handleValues(e.target.name, e.target.value);

  return (
    <Box
      width="100%"
      display="flex"
      gap="10px"
      flexDirection="column"
      maxWidth="100%"
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
      wordBreak="break-all"
      position="relative"
      zIndex="100"
      mb="2"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="10px"
        fontSize="2xl"
        position="relative"
        className="coleccion-header"
      >
        Editando{" "}
        <CustomEditable
          value={nombre}
          name="nombre"
          maxLength={30}
          onChange={handleCollectionValues}
          defaultValue="Colección sin nombre *"
          badge
        />
        <SettingsIcon
          position="absolute"
          right="0"
          cursor="pointer"
          onClick={handleOpenSettings}
        />
      </Box>
      <ColeccionConfig openSettings={openSettings} />
      <Divider />
    </Box>
  );
}

export default ColeccionHeader;
