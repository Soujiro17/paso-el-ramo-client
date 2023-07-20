import useAxiosPrivate from "./useAxiosPrivate";
import useMidMutation from "./useMidMutation";

function usePrivateMutation(props) {
  const axiosPrivate = useAxiosPrivate();

  return useMidMutation({
    ...props,
    mutationFn: (data) => props.mutationFn({ ...data, axiosPrivate }),
  });
}

export default usePrivateMutation;
