import { useFormik } from "formik";
import { Button, Fieldset, InputNumber, InputText, Toast } from "primereact";
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import { AuthContext } from "../../context/login";
import Navbar from "../Navbar";

const CreateMaterial = () => {
  const [form, setForm] = useState({
    nome: "",
    quantidade: 0,
    valorUni: 0,
    valorTotal: 0,
    descricao: "",
  });
  const { handleLogout } = useContext(AuthContext);
  const toast = useRef(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nome: "",
      descricao: "",
      quantidade: 0,
      valorUni: 0,
      valorTotal: 0,
    },
    onSubmit: () => {
      console.log(formik.values);
      api
        .post(`material`, {
          nome: formik.values.nome,
          quantidade: formik.values.quantidade,
          descricao: formik.values.descricao,
          valorTotal: formik.values.valorTotal,
          valorUni: parseFloat(formik.values.valorUni),
        })
        .then(() => {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Serviço Alterado",
            life: 3000,
          });
          navigate("/material");
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
    },
  });

  return (
    <>
      <Navbar />
      <Toast ref={toast} />
      <Fieldset legend="Criar Material">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid p-fluid">
            <div className="field col-12 md:col-3">
              <label htmlFor="nome">Nome</label>
              <InputText
                required
                name="nome"
                inputId="nome"
                value={formik.values.nome}
                onChange={formik.handleChange}
              />
            </div>

            <div className="field col-12 md:col-3">
              <label htmlFor="descricao">Descrição</label>
              <InputText
                required
                name="descricao"
                inputId="descricao"
                value={formik.values.descricao}
                onChange={formik.handleChange}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="quantidade">Quantidade</label>
              <InputNumber
                inputId="quantidade"
                showButtons
                required
                name="quantidade"
                keyfilter="int"
                value={formik.values.quantidade}
                onValueChange={formik.handleChange}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="valorUni">Valor Unitario</label>
              <InputText
                inputId="valorUni"
                required
                name="valorUni"
                keyfilter="num"
                value={formik.values.valorUni}
                onChange={formik.handleChange}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="valorTotal">Valor Total</label>
              <InputText
                inputId="valorTotal"
                name="valorTotal"
                value={
                  (formik.values.valorTotal =
                    formik.values.valorUni * formik.values.quantidade)
                }
                onChange={formik.handleChange}
                disabled
              />
            </div>
          </div>
          <Button type="submit" label="Criar" />
          <Link to="/material">
            <Button className="ml-3 p-button-warning" label="Voltar" />
          </Link>
        </form>
      </Fieldset>
    </>
  );
};

export default CreateMaterial;
