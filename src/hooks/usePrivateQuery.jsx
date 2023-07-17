import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function usePrivateQuery(props) {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    ...props,
    queryFn: (data) => props.queryFn({ ...data, axiosPrivate }),
  });
}

export default usePrivateQuery;
