import { useFormik } from "formik";
import {
  Button,
  Fieldset,
  InputNumber,
  InputText,
  Skeleton,
  Toast,
} from "primereact";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { AuthContext } from "../../context/login";
import Navbar from "../Navbar";

const UpdateServico = () => {
  document.title = "Alterar serviço | Simple Smile";

  let { id } = useParams();
  const { handleLogout } = useContext(AuthContext);
  const [data, setData] = useState();
  const [loading1, setLoading1] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({ nome: "", valor: 0 });

  const getData = () => {
    api
      .get(`servico/${id}`)
      .then(({ data }) => {
        setData({ ...data });
        setForm((form) => ({ ...form, nome: data.nome, valor: data.valor }));
      })
      .catch((e) => {
        if (e.response.data === "Unauthorized") {
          handleLogout();
        }
      });
  };

  const handleSubmit = () => {
    api
      .put(`servico/${id}`, { nome: form.nome, valor: parseFloat(form.valor) })
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Serviço Alterado",
          life: 3000,
        });
        navigate("/servico");
      })
      .catch((e) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: e.response.data,
          life: 3000,
        });
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
      <Toast ref={toast} />

      {data ? (
        <Fieldset legend={`Alterar: ${data.nome}`}>
          <div className="grid p-fluid">
            <div className="field col-12 md:col-3">
              <label htmlFor="nome">Nome</label>
              <InputText
                inputId="nome"
                name="nome"
                value={form.nome}
                onChange={(e) =>
                  setForm((form) => ({ ...form, nome: e.target.value }))
                }
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="stacked">Valor</label>
              <InputText
                type="valor"
                nome="valor"
                value={form.valor}
                onChange={(e) =>
                  setForm((form) => ({
                    ...form,
                    valor: e.target.value,
                  }))
                }
                inputId="stacked"
                keyfilter="money"
              />
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            className="p-button-warning"
            type="submit"
            label="Atualizar"
            icon="pi pi-check"
          />
          <Link to="/servico">
            <Button className="ml-3" label="Voltar" />
          </Link>
        </Fieldset>
      ) : (
        <Fieldset legend={"Carregando.... 🏗️"}>
          <Skeleton className="mb-2" />
          <Skeleton className="mb-2" />
          <Skeleton className="mb-2" />
          <Skeleton className="mb-2" />
        </Fieldset>
      )}
    </>
  );
};

export default UpdateServico;
