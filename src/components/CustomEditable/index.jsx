import { Badge, ButtonGroup, Flex, IconButton } from "@chakra-ui/react";
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
    <Editable
      textAlign="center"
      fontSize={fontSize}
      value={isEditing ? value : value || defaultValue}
      isPreviewFocusable={false}
      display="flex"
      alignItems="center"
      gap="10px"
      className={className}
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
        width="100%"
        name={name}
        value={isEditing ? value : value || defaultValue}
        onChange={onChange}
        maxLength={maxLength}
      />
      <EditableControls setIsEditing={setIsEditing} />
    </Editable>
  );
}

export default CustomEditable;
