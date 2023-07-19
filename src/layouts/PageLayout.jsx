import React from "react";
import { Helmet } from "react-helmet";
import { Box } from "@chakra-ui/layout";
import Header from "../components/Header";

function PageLayout({
  children,
  title = "Mis notas",
  description = "Mis notas es una web...",
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
