import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/config";
import { Container } from "react-bootstrap";

import DataTable from "./DataTable";

import "../styles/background.css";

function App() {
  // Hooks de datos
  //const [data, setData] = useState();
  const [monitorObj, setMonitorObj] = useState([]);

  // Carga de datos al inicio de la aplicacion
  useEffect(() => {
    loadDataFromDB();
  }, []);

  // carga de datos desde DB
  function loadDataFromDB() {
    axiosInstance
      .get(`/monitor`)
      .then((res) => {
        console.log(res.data);
        //setData(JSON.stringify(res.data));

        // Llenado del array con los datos
        setMonitorObj(res.data);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="App app-background">
      <Container className="p-5">
        <h3 className="header">Tabla de datos</h3>
        <DataTable data={monitorObj} />
      </Container>
    </div>
  );
}

export default App;
