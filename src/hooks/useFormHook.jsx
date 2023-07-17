import { yupResolver } from "@hookform/resolvers/yup";
import { useForm as useFormReactHook } from "react-hook-form";

function useFormHook({ schema, defaultValues }) {
  return useFormReactHook({
    resolver: yupResolver(schema),
    defaultValues,
  });
}

export default useFormHook;

