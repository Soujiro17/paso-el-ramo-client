import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

function useMidMutation(props) {
  const toast = useToast();

  return useMutation({
    onError: (err) =>
      toast({
        status: "error",
        title: "Error",
        description: err.response?.data?.mensaje || err.message,
      }),
    onSuccess: (data) => {
      toast({
        status: "success",
        title: "Éxitoso",
        description: data.mensaje,
      });

      if (props?.onSuccessCallback) {
        props.onSuccessCallback(data);
      }
    },
    ...props,
  });
}

export default useMidMutation;
