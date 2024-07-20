import useAxiosPrivate from "./useAxiosPrivate";
import useMidMutation from "./useMidMutation";

function usePrivateMutation({
  mutationFn,
  onSuccessMessage = "",
  onErrorMessage = "",
  onSuccess,
  onError,
  ...props
}) {
  const axiosPrivate = useAxiosPrivate();

  return useMidMutation({
    ...props,
    mutationFn: (data) => mutationFn({ ...data, axiosPrivate }),
    onSuccessMessage,
    onErrorMessage,
    onSuccessCallback: onSuccess,
    onErrorCallback: onError,
  });
}

export default usePrivateMutation;
