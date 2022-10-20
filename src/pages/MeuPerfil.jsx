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
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/login";
import api from "../api";
import Navbar from "../components/Navbar";

const MeuPerfil = () => {
  const navigate = useNavigate();
  const toast = useRef(null);

  const { handleLogout, user } = useContext(AuthContext);
  const [data, setData] = useState();

  const getData = () => {
    api
      .get("usernow")
      .then(({ data }) => {
        setData(data);
        formik.values.nome = data.nome;
        formik.values.email = data.email;
        formik.values.cpf = data.cpf;
        formik.values.nascimento = new Date(data.nascimento);
        formik.values.telefone = data.telefone;
        formik.values.sexo = data.sexo;
        formik.values.cep = data.cep;
        formik.values.endereco = data.endereco;
        formik.values.cidade = data.cidade;
        formik.values.uf = data.uf;
        formik.values.ativo = data.ativo;
        formik.values.pis = data.colaborador.pis;
        formik.values.ctps = data.colaborador.ctps;
        formik.values.adm = data.colaborador.adm;
        formik.values.cro = data.colaborador.dentista.cro;
        formik.values.especialidade = data.colaborador.dentista.especialidade;
      })
      .catch((e) => {
        console.log(e.response.data);
        // if (e.response.data === "Unauthorized") {
        //   handleLogout();
        // }
      });
  };

  useEffect(() => {
    getData();
  }, [setData]);

  const formik = useFormik({
    initialValues: {
      nome: data ? data.nome : "",
      email: data ? data.email : "",
      nascimento: data ? new Date(data.nascimento) : "",
      telefone: data ? data.telefone : "",
      sexo: data ? data.sexo : "",
      cep: data ? data.cep : "",
      endereco: data ? data.endereco : "",
      cidade: data ? data.cidade : "",
      uf: data ? data.uf : "",
    },
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
    enableReinitialize: true,
    onSubmit: (value) => {
      console.log({ ...data, value });
      api
        .put("usernow", { ...value, cpf: data.cpf })
        .then(() => {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Funcionário criado",
            life: 3000,
          });
          navigate("/dashboard");
        })
        .catch((e) => {
          console.log(e);

          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: e.response,
            life: 3000,
          });
        });
    },
  });

  const sexoOptions = [
    { label: "M", value: true },
    { label: "F", value: false },
  ];

  return (
    <>
      <Navbar />
      <Toast ref={toast} />

      {data && (
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
      )}
    </>
  );
};

export default MeuPerfil;
