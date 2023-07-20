/* eslint-disable no-console */
import { useEffect } from "react";

function useWatch(variable) {
  useEffect(() => {
    console.log("watch:", variable);
  }, [variable]);
}

export default useWatch;
