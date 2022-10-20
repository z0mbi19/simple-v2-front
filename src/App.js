import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "/node_modules/primeflex/primeflex.css";
import Login from "./pages/Login";
import { AuthContext } from "./context/login";
import Dashboard from "./pages/Dashboard";
import Servico from "./pages/Servico";
import CreateServico from "./components/Servico/CreateServico";
import UpdateServico from "./components/Servico/UpdateServico";
import Material from "./pages/Material";
import CreateMaterial from "./components/Material/CreateMaterial";
import UpdateMaterial from "./components/Material/UpdateMaterial";
import Paciente from "./pages/Paciente";
import CreatePaciente from "./components/Paciente/CreatePaciente";
import UpdatePaciente from "./components/Paciente/UpdatePaciente";
import Funcionario from "./pages/Funcionario";
import CreateFuncionario from "./components/Funcionario/CreateFuncionario";
import UpdateFuncionario from "./components/Funcionario/UpdateFuncionario";
import MeuPerfil from "./pages/MeuPerfil";
import NovoUser from "./pages/NovoUser";
function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/create" element={<NovoUser />} />

      <Route path="*" element={<Login />} />
      {user && user.jwt && (
        <>
          <Route path="/meuperfil" element={<MeuPerfil />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {user && user.colaborador && (
            <>
              <Route path="/paciente" element={<Paciente />} />
              <Route path="/paciente/create" element={<CreatePaciente />} />
              <Route path="/paciente/update/:id" element={<UpdatePaciente />} />
              <Route path="/servico" element={<Servico />} />
              <Route path="/servico/create" element={<CreateServico />} />
              <Route path="/servico/update/:id" element={<UpdateServico />} />
              <Route path="/material" element={<Material />} />
              <Route path="/material/create" element={<CreateMaterial />} />
              <Route path="/material/update/:id" element={<UpdateMaterial />} />
              {user && user.colaborador.adm && (
                <>
                  <Route path="/funcionario" element={<Funcionario />} />
                  <Route path="/user/create" element={<CreateFuncionario />} />
                  <Route
                    path="/user/update/:id"
                    element={<UpdateFuncionario />}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </Routes>
  );
}

export default App;
