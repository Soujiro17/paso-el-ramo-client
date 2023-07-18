import { Badge, ButtonGroup, Flex, IconButton } from "@chakra-ui/react";
import {
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
} from "@chakra-ui/editable";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

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
}) {
  /* Here's a custom control */

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
      value={value}
      fontSize={fontSize}
      isPreviewFocusable={false}
      display="flex"
      alignItems="center"
      gap="10px"
    >
      {badge ? (
        <Badge
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize={fontSize}
        >
          {content}
        </Badge>
      ) : (
        content
      )}
      {/* Here is the custom input */}
      <EditableInput
        width="100%"
        name={name}
        onChange={onChange}
        maxLength={maxLength}
      />
      <EditableControls />
    </Editable>
  );
}

export default CustomEditable;
