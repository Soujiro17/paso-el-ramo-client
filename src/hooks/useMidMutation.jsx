import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

function useMidMutation({
  mutationFn,
  onSuccessMessage = "",
  onErrorMessage = "",
  onSuccessCallback,
  onErrorCallback,
  ...props
}) {
  const toast = useToast();

  return useMutation({
    ...props,
    mutationFn,
    onError: (err) => {
      toast({
        status: "error",
        title: "Error",
        description:
          err.response?.data?.mensaje || onErrorMessage || err.message,
      });
      if (onErrorCallback instanceof Function) {
        onErrorCallback(err);
      }
    },

    onSuccess: (data) => {
      toast({
        status: "success",
        title: "Éxitoso",
        description: data.mensaje || onSuccessMessage,
      });

      if (onSuccessCallback instanceof Function) {
        onSuccessCallback(data);
      }
    },
  });
}

export default useMidMutation;
