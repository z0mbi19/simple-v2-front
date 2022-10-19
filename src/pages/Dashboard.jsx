import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Button,
  Calendar,
  Chart,
  Dialog,
  Dropdown,
  Fieldset,
  MultiSelect,
  Skeleton,
  Toast,
} from "primereact";
import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { addLocale } from "primereact/api";
import { useFormik } from "formik";
import api from "../api";
import { AuthContext } from "../context/login";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { handleLogout } = useContext(AuthContext);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const toast = useRef(null);
  const [date, setDate] = useState();
  const [create, setCreate] = useState();
  const [editar, setEditar] = useState();
  const [id, setId] = useState();
  const [consulta, setConsulta] = useState();
  const test = (selectInfo) => {
    setId(selectInfo.event.id);
    api
      .get("consulta/" + selectInfo.event.id)
      .then(({ data }) => {
        if (data.consulta < new Date().toLocaleString("pt-Br")) {
          toast.current.show({
            severity: "info",
            summary: "Informação",
            detail: "Essa data já passou",
            life: 3000,
          });
        } else {
          formik.values.data = data.consulta;
          formik.values.dentista = data.croID;
          formik.values.pacientes = data.userId;
          formik.values.servico = data.servico;
          formik.values.material = data.material;

          setEditar(true);
          setConsulta({
            consulta: data.consulta,
            title: selectInfo.event.title,
          });
        }
      })
      .catch((e) => {
        if (e.response.data === "Unauthorized") {
          handleLogout();
        }
      });
  };

  document.title = "Dashboard | Simple Smile";

  const popCriarConsulta = (e) => {
    if (e.start < new Date()) {
      toast.current.show({
        severity: "info",
        summary: "Informação",
        detail: "Essa data já passou",
        life: 3000,
      });
    } else {
      setDate(e.start);
      formik.values.data = e.start;
      setCreate(true);
    }
  };

  const handleDelete = () => {
    api
      .delete("consulta/" + id)
      .then(() => {
        toast.current.show({
          severity: "info",
          summary: "Informação",
          detail: "Consulta apagada",
          life: 3000,
        });
        getData();

        setEditar(false);
      })
      .catch((e) => {
        if (e.response.data === "Unauthorized") {
          handleLogout();
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      data: "",
      dentista: "",
      pacientes: "",
      servico: "",
      material: "",
    },
    onSubmit: (value, { resetForm }) => {
      const servico = formik.values.servico.map((x) => {
        return { id: x };
      });
      const material = formik.values.material.map((x) => {
        return { id: x };
      });

      if (editar) {
        api
          .put(`consulta/${id}`, {
            consulta: new Date(formik.values.data),
            croID: formik.values.dentista,
            userId: formik.values.pacientes,
            servico: servico,
            material: material,
          })
          .then(() => {
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "Consulta Alterado",
              life: 3000,
            });
            getData();
            setCreate(false);
            setEditar(false);
            resetForm({ data: "" });
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
      } else {
        api
          .post(`consulta`, {
            consulta: formik.values.data,
            croID: formik.values.dentista,
            userId: formik.values.pacientes,
            servico: servico,
            material: material,
          })
          .then(() => {
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "Consulta cadastrada com sucesso",
              life: 3000,
            });
            getData();
            setCreate(false);
            resetForm({ data: "" });
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
      }
    },
  });

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={() => {
            setCreate(false);
            formik.values.data = "";
            formik.values.dentista = "";
            formik.values.pacientes = "";
            formik.values.servico = "";
            formik.values.material = "";
          }}
          className="p-button-text"
        />
      </div>
    );
  };

  const getData = () => {
    api
      .get("formconsulta")
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
  }, [setData]);

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <br />
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  const getLightTheme = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    let horizontalOptions = {
      indexAxis: "y",
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    let stackedOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltips: {
          mode: "index",
          intersect: false,
        },
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    let multiAxisOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
        tooltips: {
          mode: "index",
          intersect: true,
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          type: "linear",
          display: true,
          position: "left",
          ticks: {
            min: 0,
            max: 100,
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          grid: {
            drawOnChartArea: false,
            color: "#ebedef",
          },
          ticks: {
            min: 0,
            max: 100,
            color: "#495057",
          },
        },
      },
    };

    return {
      basicOptions,
      horizontalOptions,
      stackedOptions,
      multiAxisOptions,
    };
  };

  const { basicOptions, horizontalOptions, multiAxisOptions, stackedOptions } =
    getLightTheme();

  return (
    <>
      <Navbar />
      <Toast ref={toast} />

      <Fieldset toggleable legend="Consultas">
        {data ? (
          <>
            {consulta && (
              <Dialog
                header={consulta.title}
                visible={editar}
                maximizable
                modal
                style={{ width: "50vw" }}
                onHide={() => setEditar(false)}
              >
                <p>Você quer Editar ou Cancelar essa Consulta?</p>
                <Button
                  label="Editar"
                  icon="pi pi-pencil"
                  className="p-button-text"
                  onClick={() => {
                    setCreate(true);
                  }}
                />
                <Button
                  label="Cancelar consulta"
                  icon="pi pi-trash"
                  onClick={handleDelete}
                  className="p-button-text p-button-danger "
                />
              </Dialog>
            )}
            <Dialog
              header={`Complete o formulario para cadastrar a consulta`}
              visible={create}
              maximizable
              modal
              style={{ width: "50vw" }}
              footer={renderFooter("displayMaximizable")}
              onHide={() => {
                setCreate(false);
                formik.values.data = "";
                formik.values.dentista = "";
                formik.values.pacientes = "";
                formik.values.servico = "";
                formik.values.material = "";
              }}
            >
              <form onSubmit={formik.handleSubmit}>
                <div className="grid mt-1 p-fluid">
                  <div className="field col-12 md:col-6">
                    <span className="p-float-label">Consulta</span>
                    <Calendar
                      name="data"
                      value={formik.values.data}
                      onChange={formik.handleChange}
                      minDate={new Date()}
                      showTime
                      dateFormat="dd/mm/yy"
                      disabledDays={[0, 6]}
                    />
                  </div>
                  <div className="field col-12 md:col">
                    <span className="p-float-label">Dentista</span>

                    <Dropdown
                      name="dentista"
                      optionLabel="nome"
                      filter
                      showClear
                      optionValue="colaborador.dentista.cro"
                      options={data.dentista}
                      value={formik.values.dentista}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="field col-12 md:col">
                    <span className="p-float-label">Paciente</span>

                    <Dropdown
                      name="pacientes"
                      optionLabel="nome"
                      filter
                      showClear
                      optionValue="id"
                      options={data.pacientes}
                      value={formik.values.pacientes}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="field col-12 md:col">
                    <span className="p-float-label">Serviço</span>
                    <MultiSelect
                      display="chip"
                      filter
                      name="servico"
                      optionLabel="nome"
                      optionValue="id"
                      value={formik.values.servico}
                      onChange={formik.handleChange}
                      options={data.servico}
                    />
                  </div>
                  <div className="field col-12 md:col">
                    <span className="p-float-label">Material</span>
                    <MultiSelect
                      display="chip"
                      filter
                      name="material"
                      optionLabel="nome"
                      optionValue="id"
                      value={formik.values.material}
                      onChange={formik.handleChange}
                      options={data.material}
                    />
                  </div>
                </div>
                <Button
                  label={editar ? "Editar" : "Cadastrar"}
                  className={editar ? "p-button-warning" : ""}
                  type="submit"
                />
              </form>
            </Dialog>

            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              weekends={false}
              selectable={true}
              locale="pt-br"
              eventContent={renderEventContent}
              select={popCriarConsulta}
              eventClick={test}
              events={data.calendar}
            />
          </>
        ) : (
          <div className="field col-12 md:col-6">
            <Skeleton className="mb-2"></Skeleton>
            <Skeleton width="10rem" className="mb-2"></Skeleton>
            <Skeleton width="5rem" className="mb-2"></Skeleton>
            <Skeleton height="2rem" className="mb-2"></Skeleton>
            <Skeleton width="10rem" height="4rem"></Skeleton>
          </div>
        )}
      </Fieldset>
      {data && data.graficoConsulta && (
        <Fieldset legend="Relatórios">
          <div className="grid">
            <div className="card" style={{ maxWidth: "500px" }}>
              <h5>Quantidade de consultas por mês</h5>
              <Chart type="doughnut" data={data.graficoConsulta} />
            </div>
            <div className="card" style={{ maxWidth: "500px" }}>
              <h5>Serviço e valores</h5>
              <Chart type="doughnut" data={data.graficoServico} />
            </div>
            <div className="card" style={{ maxWidth: "500px" }}>
              <h5>Materiais e quantidades</h5>
              <Chart type="doughnut" data={data.graficomaterial} />
            </div>
          </div>
        </Fieldset>
      )}
    </>
  );
};

export default Dashboard;
