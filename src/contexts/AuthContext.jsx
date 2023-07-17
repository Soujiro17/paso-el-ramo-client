/* eslint-disable react/prop-types */
import { createContext, useState, useMemo } from "react";

export const AuthContext = createContext({
  auth: "",
  setAuth: () => {}
});

function AuthProvider({ children }){
  const [auth, setAuth] = useState(null)

  const value = useMemo(() => ({ auth, setAuth }), [auth, setAuth])

  return(
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider;

