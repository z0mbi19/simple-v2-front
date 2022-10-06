import { Fieldset } from "primereact";
import React from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <Fieldset legend="Dashboard">
        <div>Dashboard</div>
      </Fieldset>
    </>
  );
};

export default Dashboard;
