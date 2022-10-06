import { Card } from "primereact";
import React, { useContext, useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import TableCrud from "../components/TableCrud";
import { AuthContext } from "../context/login";

const Paciente = () => {
  document.title = "Serviço | Simple Smile";

  const { handleLogout } = useContext(AuthContext);
  const [data, setData] = useState();

  const dateConvert = (v) => {
    return new Date(v.nascimento);
  };

  const dataFormat = (rowData) => {
    return dateConvert(rowData).toLocaleDateString();
  };

  const sexoBody = (rowData) => {
    return rowData.sexo ? "M" : "F";
  };

  const cols = [
    { field: "id", header: "ID", sortable: true },
    { field: "nome", header: "Nome", sortable: true },
    { field: "sexo", header: "Sexo", body: sexoBody },
    { field: "cpf", header: "CPF" },
    {
      field: "email",
      header: "Email",
    },
    { field: "cep", header: "CEP", style: { paddingLeft: "50px" } },
    { field: "telefone", header: "Telefone" },
    { field: "nascimento", header: "Data de nascimento", body: dataFormat },
  ];

  const getData = () => {
    api
      .get("paciente")
      .then(({ data }) => {
        setData(data);
      })
      .catch((e) => {
        if (e.response.data === "Unauthorized") {
          handleLogout();
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Navbar />
      <Card title="Paciente" className="m-5">
        <TableCrud data={data} cols={cols} url={"paciente"} getData={getData} />
      </Card>
    </>
  );
};

export default Paciente;
