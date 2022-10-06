import { Card } from "primereact";
import React, { useContext, useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import TableCrud from "../components/TableCrud";
import { AuthContext } from "../context/login";

const Funcionario = () => {
  const { handleLogout } = useContext(AuthContext);

  const [data, setData] = useState();

  const admBody = (rowData) => {
    return rowData.colaborador.adm ? "Sim" : "Não";
  };

  const ativoBody = (rowData) => {
    return rowData.ativo ? "Sim" : "Não";
  };

  const cols = [
    { field: "id", header: "ID" },
    { field: "ativo", header: "Ativo", body: ativoBody },
    { field: "nome", header: "Nome" },
    { field: "email", header: "Email" },
    { field: "telefone", header: "Telefone" },
    { field: "colaborador.ctps", header: "CTPS" },
    { field: "colaborador.adm", header: "Adm", body: admBody },
    { field: "colaborador.dentista.cro", header: "CRO" },
  ];

  const getData = () => {
    api
      .get("user")
      .then(({ data }) => {
        console.log(data);
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

    return () => {
      getData();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Card className="m-5" title="Funcionários">
        <TableCrud cols={cols} data={data} getData={getData} url="user" />
      </Card>
    </>
  );
};

export default Funcionario;
