import { Button, IconButton } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import { useRef } from "react";

function AlertDialogComponent({
  title = "",
  description = "",
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  buttonText = "",
  iconButton = false,
  buttonScheme = "red",
  buttonSize = "",
  icon,
  zIndexButton,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const onClickConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      {iconButton ? (
        <IconButton
          position="relative"
          zIndex={zIndexButton}
          size={buttonSize}
          colorScheme={buttonScheme}
          onClick={onOpen}
          icon={icon}
        />
      ) : (
        <Button colorScheme="red" onClick={onOpen}>
          {buttonText}
        </Button>
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody
              dangerouslySetInnerHTML={{ __html: description }}
            />

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {cancelText}
              </Button>
              <Button colorScheme="red" onClick={onClickConfirm} ml={3}>
                {confirmText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default AlertDialogComponent;
