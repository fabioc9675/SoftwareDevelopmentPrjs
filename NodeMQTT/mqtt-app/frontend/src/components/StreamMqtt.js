import React, { useEffect, useState } from "react";
import { Button, Card, Container, Navbar, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

import mqtt from "precompiled-mqtt";
import DataChart from "./DataChart";

import "../styles/background.css";

export default function StreamMqtt() {
    // Hooks of data
    const [topicName, setTopicName] = useState("iotUdeA/example");
    const [topicPublic, setTopicPublic] = useState("iotUdeA/public");
    const [varName, setVarName] = useState("variable");
    const [status, setStatus] = useState("disconnected");
    const [instrumentObj, setInstrumentObj] = useState([]);

    // URL history
    const navigate = useNavigate();

    // cliente mqtt
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
    const connectUrl = `wss://broker.emqx.io:8084/mqtt`;
    const client = mqtt.connect(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: "ff",
        password: "ff",
        reconnectPeriod: 1000,
    });

    useEffect(() => {
        // connection to topic
        if (client) {
            //console.log("conectando");
            client.on("connect", () => {
                setStatus("connected");
            });

            client.on("message", (topic, message) => {
                // function to update data
                var dataAux = {
                    _id: instrumentObj.length,
                    hour: 0,
                    type: "",
                    topic: topic,
                    author: "",
                    varname: JSON.parse(message).varname,
                    varvalue: JSON.parse(message).varvalue,
                };
                setInstrumentObj((instrumentObj) => [
                    ...instrumentObj,
                    dataAux,
                ]);

                // console.log(
                //     "Mensaje recibido en " + topic + ": " + message.toString()
                // );
                // console.log(instrumentObj);
            });

            client.on("error", (err) => {
                console.log("error = ", err);
            });
        }
    }, [client]);

    useEffect(() => {
        //console.log(instrumentObj.length);
        if (instrumentObj.length > 100) {
            setInstrumentObj((instrumentObj) =>
                instrumentObj.filter((_, i) => i !== 0)
            );
        }
    }, [instrumentObj, instrumentObj.length]);

    // function to handle click
    function HandleClick() {
        // alert("se presiono la etiqueta");
        client.unsubscribe(topicName, (err) => {
            if (!err) {
                setStatus("disconnected");
                // console.log(`eliminada la suscripcion a ${topicName}`);
            } else {
                // console.log("error");
            }
        });
        navigate("/");
    }

    // function to subscribe to a topic
    function HandleButtonClick(e) {
        if (e.target.id === "subscribe") {
            // console.log(`subscripcion a ${topicName}`);

            if (status === "connected") {
                // console.log("suscribiendo");
                client.subscribe(topicName, (err) => {
                    if (!err) {
                        //   console.log(`Conectado y suscrito a ${topicName}`);
                    } else {
                        // console.log("error");
                    }
                });
            }
        }

        if (e.target.id === "cancel") {
            //console.log(`subscripcion a ${topicName}`);
            if (status === "connected") {
                client.unsubscribe(topicName, (err) => {
                    if (!err) {
                        setStatus("disconnected");
                        //  console.log(`eliminada la suscripcion a ${topicName}`);
                    } else {
                        //   console.log("error");
                    }
                });
            }
        }

        if (e.target.id === "publish") {
            //console.log(`subscripcion a ${topicName}`);
            if (status === "connected") {
                client.publish(topicPublic, varName);
            }
        }
    }

    return (
        <div className="App app-background">
            <Navbar className="sticky-top" bg="light">
                <Container>
                    <Navbar.Brand onClick={HandleClick}>
                        {" "}
                        <img
                            src="/icon.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />{" "}
                        Semillero GIBIC-GICM
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Powered by:{" "}
                            <a href="https://github.com/fabioc9675">
                                Fabian Castaño
                            </a>{" "}
                            -{" "}
                            <a href="https://github.com/jongalon">
                                Jonathan Gallego
                            </a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="p-5 ">
                <DataChart data={instrumentObj} />
            </Container>

            <Container className="p-5 mb-4 rounded-3 shadow-lg bg-transparent">
                <div className="d-flex flex-column">
                    <h2>Estructura de datos</h2>
                    <p>Tópico = iotUdeA/example</p>
                    <SyntaxHighlighter language="json" style={darcula}>
                        {`{
    "author":"Nombre", 
    "varname":"Variable",
    "varvalue":Valor
}`}
                    </SyntaxHighlighter>
                </div>
            </Container>

            <div>
                <Container className="p-5 mb-4 rounded-3 shadow-lg app-card">
                    <div className="d-flex  flex-row">
                        <Card
                            style={{ backgroundColor: "#454e69", width: "66%" }}
                        >
                            <Card.Header>Tópico</Card.Header>
                            <Card.Body>
                                <Form.Control
                                    placeholder="iotUdeA/example"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => {
                                        setTopicName(e.target.value);
                                    }}
                                />
                            </Card.Body>
                        </Card>

                        <Card
                            style={{ backgroundColor: "#1d2333", width: "33%" }}
                        >
                            <Card.Header>Suscribir Tópico</Card.Header>
                            <Card.Body>
                                {/* <div className="row"> */}
                                <div className="col d-grid">
                                    <Button
                                        id="subscribe"
                                        variant="outline-success"
                                        onClick={(e) => {
                                            HandleButtonClick(e);
                                        }}
                                    >
                                        Suscribir
                                    </Button>
                                </div>
                                {/* <div className="col d-grid">
                                        <Button
                                            id="cancel"
                                            variant="outline-danger"
                                            onClick={(e) => {
                                                HandleButtonClick(e);
                                            }}
                                        >
                                            Darse de baja
                                        </Button> 
                                    </div> */}
                                {/* </div> */}
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </div>

            <div>
                <Container className="p-5 mb-4 rounded-3 shadow-lg app-card">
                    <div className="d-flex flex-row">
                        <Card
                            style={{ backgroundColor: "#454e69", width: "33%" }}
                        >
                            <Card.Header>Tópico</Card.Header>
                            <Card.Body>
                                <Form.Control
                                    placeholder="iotUdeA/public"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => {
                                        setTopicPublic(e.target.value);
                                    }}
                                />
                            </Card.Body>
                        </Card>

                        <Card
                            style={{ backgroundColor: "#454e69", width: "33%" }}
                        >
                            <Card.Header>Mensaje</Card.Header>
                            <Card.Body>
                                <Form.Control
                                    placeholder="Mensaje"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => {
                                        setVarName(e.target.value);
                                    }}
                                />
                            </Card.Body>
                        </Card>

                        <Card
                            style={{ backgroundColor: "#1d2333", width: "33%" }}
                        >
                            <Card.Header>Publicar Tópico</Card.Header>
                            <Card.Body>
                                <div className="col d-grid ">
                                    {" "}
                                    <Button
                                        id="publish"
                                        variant="outline-success"
                                        onClick={(e) => {
                                            HandleButtonClick(e);
                                        }}
                                    >
                                        Publicar
                                    </Button>{" "}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </div>
        </div>
    );
}
