import { useFormik } from "formik";
import {
  Button,
  Calendar,
  Fieldset,
  InputMask,
  InputNumber,
  InputText,
  SelectButton,
  Toast,
} from "primereact";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Navbar from "../Navbar";

const CreateFuncionario = () => {
  const navigate = useNavigate();
  const toast = useRef(null);

  document.title = "Criar funcionário | Simple Smile";

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
      ctps: "",
      pis: "",
      adm: false,
      dentista: false,
      cro: "",
      especialidade: "",
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
      console.log(value);
      api
        .post(
          "user",
          value.dentista
            ? {
                nome: formik.values.nome,
                email: formik.values.email,
                cpf: formik.values.cpf,
                senha: formik.values.cpf,
                nascimento: new Date(formik.values.nascimento).toISOString(),
                telefone: formik.values.telefone,
                sexo: formik.values.sexo,
                cep: formik.values.cep,
                endereco: `${formik.values.endereco} ${formik.values.numero}`,
                cidade: formik.values.cidade,
                uf: formik.values.uf,
                ctps: formik.values.ctps,
                pis: formik.values.pis,
                adm: formik.values.adm,
                cro: formik.values.cro,
                especialidade: formik.values.especialidade,
              }
            : {
                nome: formik.values.nome,
                email: formik.values.email,
                cpf: formik.values.cpf,
                senha: formik.values.cpf,
                nascimento: new Date(formik.values.nascimento).toISOString(),
                telefone: formik.values.telefone,
                sexo: formik.values.sexo,
                cep: formik.values.cep,
                endereco: `${formik.values.endereco} ${formik.values.numero}`,
                cidade: formik.values.cidade,
                uf: formik.values.uf,
                ctps: formik.values.ctps,
                pis: formik.values.pis,
                adm: formik.values.adm,
              }
        )
        .then(() => {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Funcionário criado",
            life: 3000,
          });
          navigate("/funcionario");
        })
        .catch((e) => {
          console.log(e);
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

  const admOptions = [
    { label: "SIM", value: true },
    { label: "NÃO", value: false },
  ];

  return (
    <>
      <Toast ref={toast} />

      <Navbar />
      <Fieldset legend="Criando funcionário">
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
              <label htmlFor="numero">Número</label>
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
              <InputText
                required
                inputId="uf"
                name="uf"
                type="type"
                value={formik.values.uf}
                onChange={formik.handleChange}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="ctps">CTPS</label>
              <InputNumber
                required
                inputId="ctps"
                name="ctps"
                type="type"
                value={formik.values.ctps}
                onValueChange={formik.handleChange}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="pis">PIS</label>
              <InputNumber
                required
                inputId="pis"
                name="pis"
                type="type"
                value={formik.values.pis}
                onValueChange={formik.handleChange}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="adm">Administrador</label>
              <SelectButton
                required
                options={admOptions}
                inputId="adm"
                name="adm"
                type="type"
                value={formik.values.adm}
                onChange={formik.handleChange}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="adm">dentista</label>
              <SelectButton
                required
                options={admOptions}
                inputId="dentista"
                name="dentista"
                type="type"
                value={formik.values.dentista}
                onChange={formik.handleChange}
              />
            </div>
            {formik.values.dentista && (
              <>
                <div className="field col-12 md:col-3">
                  <label htmlFor="cro">CRO</label>
                  <InputNumber
                    required
                    inputId="cro"
                    name="cro"
                    type="type"
                    value={formik.values.cro}
                    onValueChange={formik.handleChange}
                  />
                </div>
                <div className="field col-12 md:col-3">
                  <label htmlFor="especialidade">especialidade</label>
                  <InputText
                    required
                    inputId="especialidade"
                    name="especialidade"
                    type="type"
                    value={formik.values.especialidade}
                    onChange={formik.handleChange}
                  />
                </div>
              </>
            )}
          </div>
          <Button label="Criar" type="submit" />
        </form>
      </Fieldset>
    </>
  );
};

export default CreateFuncionario;
