import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function usePrivateMutation(props) {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    ...props,
    mutationFn: (data) => props.mutationFn({ ...data, axiosPrivate }),
  });
}

export default usePrivateMutation;
