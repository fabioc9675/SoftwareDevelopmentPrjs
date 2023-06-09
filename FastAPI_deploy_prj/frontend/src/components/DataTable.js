import React from "react";
import { Table } from "react-bootstrap";

export default function DataTable(props) {
  const { data } = props;
  return (
    <div className="container">
      <div className="container p-5">
        <h2>Tabla de datos</h2>
      </div>
      <div className="container grey lighten-4">
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Lugar</th>
              <th>Autor</th>
              <th>Temperatura</th>
              <th>Humedad</th>
            </tr>
          </thead>
          <tbody>
            {data.map((monitorObj) => {
              return (
                <tr key={monitorObj._id}>
                  <td>{monitorObj.createdAt}</td>
                  <td>{monitorObj.place}</td>
                  <td>{monitorObj.author}</td>
                  <td>{monitorObj.temperature}</td>
                  <td>{monitorObj.humidity}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
