import { useFormik } from "formik";
import {
  Button,
  Calendar,
  Divider,
  Fieldset,
  InputMask,
  InputNumber,
  InputText,
  Password,
  SelectButton,
  Toast,
} from "primereact";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const NovoUser = () => {
  const navigate = useNavigate();
  const toast = useRef(null);

  document.title = "Criar paciente | Simple Smile";

  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      cpf: "",
      nascimento: "",
      telefone: "",
      sexo: "",
      cep: "",
      endereco: "",
      cidade: "",
      numero: "",
      uf: "",
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
    onSubmit: (value) => {
      api
        .post("paciente", {
          nome: formik.values.nome,
          email: formik.values.email,
          cpf: formik.values.cpf,
          senha: formik.values.senha,
          nascimento: new Date(formik.values.nascimento).toISOString(),
          telefone: formik.values.telefone,
          sexo: formik.values.sexo,
          cep: formik.values.cep,
          endereco: `${formik.values.endereco} ${formik.values.numero}`,
          cidade: formik.values.cidade,
          uf: formik.values.uf,
        })
        .then(() => {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Paciente criado",
            life: 3000,
          });
          navigate("/");
        })
        .catch((e) => {
          if (e.response.data.lenght > 0) {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: e.response.data[0],
              life: 3000,
            });
          } else {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: e.response.data,
              life: 3000,
            });
          }
        });
    },
  });

  const getCep = () => {
    api
      .get(`https://viacep.com.br/ws/${formik.values.cep}/json`)
      .then(({ data }) => {
        formik.values.endereco = `${data.logradouro} ${data.bairro}`;
        formik.values.cidade = data.localidade;
        formik.values.uf = data.uf;
      })
      .catch((e) => "ok");
  };

  useEffect(() => {
    getCep();
  }, [formik.values.cep]);

  const sexoOptions = [
    { label: "M", value: true },
    { label: "F", value: false },
  ];

  const header = <h6>Pick a password</h6>;
  const footer = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div>
      <Fieldset legend="Criar novo usuario">
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
              <label htmlFor="senha">Senha</label>
              <Password
                name="senha"
                value={formik.values.senha}
                onChange={formik.handleChange}
                header={header}
                footer={footer}
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
              <label htmlFor="endereco">Endere??o</label>
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
              <label htmlFor="numero">N??mero</label>
              <InputNumber
                required
                name="numero"
                inputId="numero"
                value={formik.values.numero}
                onValueChange={formik.handleChange}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="uf">UF</label>
              <InputMask
                required
                mask="aa"
                inputId="uf"
                name="uf"
                type="type"
                value={formik.values.uf}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <Button label="Criar" type="submit" />
          <Link to="/">
            <Button className="p-button-warning ml-5 " label="Voltar" />
          </Link>
        </form>
      </Fieldset>{" "}
    </div>
  );
};

export default NovoUser;
