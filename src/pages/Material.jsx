import { Card, Fieldset } from "primereact";
import React, { useContext, useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import TableCrud from "../components/TableCrud";
import { AuthContext } from "../context/login";

const Material = () => {
  const [data, setData] = useState();
  const { handleLogout } = useContext(AuthContext);

  const cols = [
    { field: "id", header: "ID" },
    { field: "nome", header: "Nome" },
    { field: "quantidade", header: "quantidade" },
    { field: "valorUni", header: "Valor unitario" },
    { field: "valorTotal", header: "Valor Total" },
  ];

  const getData = () => {
    api
      .get("material")
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
      <Card title="Material" className="m-5">
        <TableCrud getData={getData} data={data} cols={cols} url={"material"} />
      </Card>
    </>
  );
};

export default Material;
