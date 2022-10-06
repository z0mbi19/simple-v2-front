import { Button, Dialog, Menubar, Sidebar } from "primereact";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/login";
import "./Navbar";

const Navbar = () => {
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [displayBasic, setDisplayBasic] = useState(false);
  const { user, handleLogout } = useContext(AuthContext);

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Não"
          icon="pi pi-times"
          onClick={() => setDisplayBasic(false)}
          className="p-button-text"
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          className="p-button-danger"
          onClick={() => handleLogout()}
          autoFocus
        />
      </div>
    );
  };

  return (
    <>
      <Sidebar
        visible={visibleLeft}
        position="right"
        onHide={() => setVisibleLeft(false)}
      >
        <Link
          style={{ textDecoration: "none", color: "rgb(11, 180, 173)" }}
          to="/dashboard"
        >
          <h1>Simple Smile</h1>
        </Link>
        {user && user.colaborador && (
          <>
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to="/paciente"
            >
              <p>Pacientes</p>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to="/servico"
            >
              <p>Serviços</p>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to="/material"
            >
              <p>Material</p>
            </Link>
            {user.colaborador.adm && (
              <>
                <Link
                  style={{ textDecoration: "none", color: "#000" }}
                  to="/funcionario"
                >
                  <p>Funcionário</p>
                </Link>
              </>
            )}
          </>
        )}
        <Button
          label="Logout"
          className="p-button-raised p-button-danger p-button-text"
          onClick={() => setDisplayBasic(true)}
        />
      </Sidebar>

      <Dialog
        header="Header"
        visible={displayBasic}
        style={{ width: "50vw" }}
        footer={renderFooter("displayBasic")}
      >
        <p>Tem certeza que quer sair ?</p>
      </Dialog>

      <Menubar
        start={
          <Link
            style={{ textDecoration: "none", color: "#feffff" }}
            to="/dashboard"
          >
            <h1>Simple Smile</h1>
          </Link>
        }
        model={[]}
        style={{
          backgroundColor: "rgb(11, 180, 173)",
          borderRadius: 0,
          margin: 0,
        }}
        end={
          <Button
            icon="pi pi-align-justify"
            className="p-button-rounded p-button-text p-button-plain"
            aria-label="Filter"
            onClick={() => setVisibleLeft(true)}
          />
        }
      />
    </>
  );
};

export default Navbar;
