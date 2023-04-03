import React from "react";
import { Table } from "react-bootstrap";

export default function DataTable(props) {
    // definition of props to use in the component
    const { data } = props;
    return (
        <div className="container">
            <h4>Tabla de datos</h4>
            <div className="grey lighten-4">
                <Table responsive striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Nombre Variable</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((instrumentObj) => {
                            return (
                                <tr key={instrumentObj._id}>
                                    <td>{instrumentObj.hour} </td>
                                    <td>{instrumentObj.varname} </td>
                                    <td>{instrumentObj.varvalue} </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
