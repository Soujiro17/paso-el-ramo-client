import React from "react";
import { Helmet } from "react-helmet";
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
      {children}
    </>
  );
}

export default PageLayout;
