import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useLocation, useNavigate } from "react-router";
import { axiosInstance } from "../config/config";
import moment from "moment";
import { Card, Container, Navbar } from "react-bootstrap";

import DataChart from "./DataChart";

export default function Query(props) {
    // component props
    const location = useLocation();
    const { author, subtopic, varname, title } = location.state;

    // Hooks of data
    const [data, setData] = useState("Hello Fabian!");
    const [instrumentObj, setInstrumentObj] = useState([
        {
            _id: 1,
            hour: 0,
            topic: "",
            author: "",
            varname: "",
            varvalue: 0,
        },
    ]);

    // URL history
    const navigate = useNavigate();

    // it is to do something  when application load
    useEffect(() => {
        loadDataFromDB();
    }, []);

    // Load Data from database
    function loadDataFromDB() {
        axiosInstance
            .get(
                `/api/instrumentation/author/${author}/subtopic/${subtopic}/varname/${varname}`
            )
            .then((res) => {
                console.log(res.data);
                setData(JSON.stringify(res.data));
                // fill data array with the data
                var dataM = res.data;
                for (var i = 0; i < dataM.length; i++) {
                    // make a regression of temp with tensorflow model
                    // dataM[i].temp_far = makeRegression(dataM[i].temp_env);
                    dataM[i].hour = moment(new Date(dataM[i].createdAt)).format(
                        "lll"
                    );
                }
                setInstrumentObj(dataM);
            })
            .catch((err) => console.error(err));
    }

    // function to handle click
    function HandleClick() {
        // alert("se presiono la etiqueta");

        navigate("/");
    }

    return (
        <div className="App">
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand onClick={HandleClick}>
                        Semillero GIBIC
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Powered by:{" "}
                            <a href="https://github.com/fabioc9675">
                                Fabian Castaño
                            </a>
                            -{" "}
                            <a href="https://github.com/jongalon">
                                Jonathan Gallego
                            </a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="p-3 ">
                <h3 className="header" onClick={HandleClick}>
                    {title}
                </h3>
                {/* <Container className="p-5 mb-4 bg-light rounded-3">
          <div className="d-flex flex-row">
            <Card style={{ width: "30%" }}>
              <Card.Header>Temperatura</Card.Header>
              <Card.Body>
                <Card.Text>{tempC}</Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "30%" }}>
              <Card.Header>Humedad</Card.Header>
              <Card.Body>
                <Card.Text>{humidity}</Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "30%" }}>
              <Card.Header>Distancia</Card.Header>
              <Card.Body>
                <Card.Text>{distanceC}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Container> */}
                <DataChart data={instrumentObj} />
                {/* <DataTable data={monitorObj} /> */}
            </Container>
        </div>
    );
}
