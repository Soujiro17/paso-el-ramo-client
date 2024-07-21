import {
  Badge,
  Box,
  ButtonGroup,
  Flex,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import {
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
} from "@chakra-ui/editable";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

function EditableControls({ setIsEditing }) {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  useEffect(() => {
    if (isEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [isEditing, setIsEditing]);

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
    </Flex>
  );
}

function CustomEditable({
  value = "",
  name = "",
  onChange,
  badge = false,
  fontSize = "2xl",
  maxLength,
  width,
  defaultValue,
  className,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const { colorMode } = useColorMode();

  const content = (
    <EditablePreview
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
      wordBreak="break-all"
      width={width}
    />
  );

  return (
    <Box position="relative" className={className}>
      <Editable
        textAlign="center"
        fontSize={["sm", "md", "xl"]}
        value={isEditing ? value : value || defaultValue}
        isPreviewFocusable={false}
        width={isEditing ? "fit-content" : "inherit"}
        bg={colorMode === "dark" ? "gray.700" : "white"}
        display="flex"
        position={isEditing ? "sticky" : "relative"}
        zIndex="100"
        alignItems="center"
        padding=".3rem .2rem"
        gap="10px"
      >
        {badge ? (
          <Badge
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize={fontSize}
            className="coleccion-nombre-badge"
          >
            {content}
          </Badge>
        ) : (
          content
        )}
        {/* Here is the custom input */}
        <EditableInput
          type="text"
          width="150px"
          name={name}
          value={isEditing ? value : value || defaultValue}
          onChange={onChange}
          maxLength={maxLength}
          required
        />
        <EditableControls setIsEditing={setIsEditing} />
      </Editable>
    </Box>
  );
}

export default CustomEditable;
