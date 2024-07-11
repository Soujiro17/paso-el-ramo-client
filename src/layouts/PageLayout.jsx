import React from "react";
import { Helmet } from "react-helmet";
import { Box } from "@chakra-ui/layout";
import Header from "../components/Header";

function PageLayout({
  children,
  title = "Inicio | Paso el ramo",
  description = "Paso el ramo es una aplicación web destinada a que cualquier estudiante pueda realizar el cálculo de su promedio, pudiendo guardar la información en colecciones al iniciar sesión",
}) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Header />
      <Box minHeight="93vh" pb="150px" className="main-container">
        {children}
      </Box>
    </>
  );
}

export default PageLayout;
