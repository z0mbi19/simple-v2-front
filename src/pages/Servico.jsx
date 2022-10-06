import { Card, Fieldset } from "primereact";
import React, { useContext, useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import TableCrud from "../components/TableCrud";
import { AuthContext } from "../context/login";

const Servico = () => {
  document.title = "Serviço | Simple Smile";

  const { handleLogout } = useContext(AuthContext);
  const [data, setData] = useState();

  const cols = [
    { field: "id", header: "ID" },
    { field: "nome", header: "Nome" },
    { field: "valor", header: "Valor" },
  ];

  const getData = () => {
    api
      .get("servico")
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
      <Card title="Serviço" className="m-5">
        <TableCrud data={data} cols={cols} url={"servico"} getData={getData} />
      </Card>
    </>
  );
};

export default Servico;
