import { useFormik } from "formik";
import {
  Button,
  Calendar,
  Fieldset,
  InputMask,
  InputNumber,
  InputText,
  SelectButton,
  Skeleton,
  Toast,
} from "primereact";
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/login";
import api from "../api";
import Navbar from "../components/Navbar";

const MeuPerfil = () => {
  const navigate = useNavigate();
  const toast = useRef(null);

  const { handleLogout, user } = useContext(AuthContext);
  const [data, setData] = useState();

  const formik = useFormik({
    initialValues: user,
    validate: (data) => {
      let errors = {};
      if (!data.nome) {
        errors.nome = "Nome e obrigatorio";
      }
      if (!data.email) {
        errors.email = "Email e obrigatorio";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Email invalido. E.g. example@email.com";
      }
    },
    onSubmit: (value) => {
      console.log(value);
      //   api
      //     .put(
      //       "usernow/" + user.id,
      //       value.cro

      //     )
      //     .then(() => {
      //       toast.current.show({
      //         severity: "success",
      //         summary: "Successful",
      //         detail: "Funcionário criado",
      //         life: 3000,
      //       });
      //       navigate("/dashboard");
      //     })
      //     .catch((e) => {
      //       console.log(e);

      //       toast.current.show({
      //         severity: "error",
      //         summary: "Error",
      //         detail: e.response.data,
      //         life: 3000,
      //       });
      //     });
    },
  });

  const sexoOptions = [
    { label: "M", value: true },
    { label: "F", value: false },
  ];

  return (
    <>
      <Navbar />
      <Fieldset legend="Meus Dados">
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
              <label htmlFor="email">Email</label>
              <InputText
                required
                tooltip="Exmplo aaa@aaa.aaa"
                inputId="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="CPF">CPF</label>
              <InputMask
                required
                mask="999.999.999-99"
                inputId="CPF"
                name="cpf"
                type="type"
                value={formik.values.cpf}
                onChange={formik.handleChange}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="nascimento">Data de nascimento</label>
              <Calendar
                required
                dateFormat="dd/mm/yy"
                inputId="nascimento"
                name="nascimento"
                type="type"
                value={formik.values.nascimento}
                onChange={formik.handleChange}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="Telefone">telefone</label>
              <InputMask
                required
                mask="(99) 99999-9999"
                inputId="telefone"
                name="telefone"
                type="type"
                value={formik.values.telefone}
                onChange={formik.handleChange}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="sexo">Sexo</label>
              <SelectButton
                required
                options={sexoOptions}
                inputId="sexo"
                name="sexo"
                type="type"
                value={formik.values.sexo}
                onChange={formik.handleChange}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="cep">CEP</label>
              <InputMask
                required
                mask="99999-999"
                inputId="cep"
                name="cep"
                type="type"
                value={formik.values.cep}
                onChange={formik.handleChange}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="endereco">Endereço</label>
              <InputText
                required
                name="endereco"
                inputId="endereco"
                value={formik.values.endereco}
                onChange={formik.handleChange}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="cidade">Cidade</label>
              <InputText
                required
                name="cidade"
                inputId="cidade"
                value={formik.values.cidade}
                onChange={formik.handleChange}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="uf">UF</label>
              <InputText
                required
                inputId="uf"
                name="uf"
                type="type"
                value={formik.values.uf}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <Button className="p-button-warning" type="submit" label="Editar" />
        </form>
      </Fieldset>
    </>
  );
};

export default MeuPerfil;
