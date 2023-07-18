import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";
import AuthProvider from "./contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

if (import.meta.env.VITE_NODE_ENV !== "development") {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraProvider
          toastOptions={{
            defaultOptions: {
              position: "bottom",
              isClosable: true,
              duration: 3000,
            },
          }}
        >
          <AppRoutes />
          <ToastContainer />
        </ChakraProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
