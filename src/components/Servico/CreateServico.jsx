import { Button, Fieldset, InputText, Toast } from "primereact";
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import { AuthContext } from "../../context/login";
import Navbar from "../Navbar";

const CreateServico = () => {
  const [form, setForm] = useState({ nome: "", valor: 0 });
  const { handleLogout } = useContext(AuthContext);
  const toast = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(parseFloat(form.valor));
    api
      .post(`servico`, {
        nome: form.nome,
        valor: parseFloat(form.valor),
      })
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
  return (
    <>
      <Navbar />
      <Toast ref={toast} />
      <Fieldset legend={"Criar serviço"}>
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
          type="submit"
          label="Salvar"
          icon="pi pi-check"
        />
        <Link to="/servico">
          <Button className="ml-3 p-button-warning" label="Voltar" />
        </Link>
      </Fieldset>
    </>
  );
};

export default CreateServico;
