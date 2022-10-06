import { Fieldset, Skeleton } from "primereact";
import React from "react";
import Navbar from "../Navbar";

const UpdateFuncionario = () => {
  return (
    <>
      <Navbar />
      <Fieldset legend={"Carregando.... 🏗️"}>
        <Skeleton className="mb-2" />
        <Skeleton className="mb-2" />
        <Skeleton className="mb-2" />
        <Skeleton className="mb-2" />
      </Fieldset>
    </>
  );
};

export default UpdateFuncionario;
