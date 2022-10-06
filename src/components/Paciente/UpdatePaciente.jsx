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
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { AuthContext } from "../../context/login";
import Navbar from "../Navbar";

const UpdatePaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useRef(null);

  const { handleLogout } = useContext(AuthContext);
  const [data, setData] = useState();

  console.log(id);

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
    onSubmit: () => {
      console.log(formik.values);
      api
        .put("paciente/" + id, {
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
        })
        .then(() => {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Paciente criado",
            life: 3000,
          });
          navigate("/paciente");
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

  const getData = () => {
    api
      .get(`paciente/${id}`)
      .then(({ data }) => {
        setData({ ...data[0] });
        formik.values.nome = data[0].nome;
        formik.values.email = data[0].email;
        formik.values.cpf = data[0].cpf;
        formik.values.nascimento = new Date(data[0].nascimento);
        formik.values.telefone = data[0].telefone;
        formik.values.sexo = data[0].sexo;
        formik.values.cep = data[0].cep;
        formik.values.endereco = data[0].endereco;
        formik.values.cidade = data[0].cidade;
        formik.values.uf = data[0].uf;
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

  console.log(data);

  const sexoOptions = [
    { label: "M", value: true },
    { label: "F", value: false },
  ];

  return (
    <>
      <Navbar />
      <Toast ref={toast} />

      {data ? (
        <Fieldset legend={`ALterando: ${data.nome}`}>
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
            <Button
              label="Atualizar"
              className="p-button-warning"
              type="submit"
            />
          </form>
          <Link to="/paciente">
            <Button label="Voltar" className="mt-3" />
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

export default UpdatePaciente;
