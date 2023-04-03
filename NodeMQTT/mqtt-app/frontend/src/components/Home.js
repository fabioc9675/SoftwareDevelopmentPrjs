import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Container, Nav, Navbar, Form, Card } from "react-bootstrap";

import { axiosInstance } from "../config/config";
import Query from "./Query";

export default function Home() {
    // URL history
    const navigate = useNavigate();

    // useState
    const [authors, setAuthors] = useState([]);
    const [author, setAuthor] = useState("");
    const [types, setTypes] = useState([]);
    const [type, setType] = useState("");
    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState("");
    const [varnames, setVarnames] = useState([]);
    const [varname, setVarname] = useState("");

    // wait for load model
    useEffect(() => {
        loadAuthorsFromDB();
    }, []);

    useEffect(() => {
        if (author !== "") {
            loadTypesFromDB();
        }
    }, [author]);

    useEffect(() => {
        if ((author !== "") & (type !== "")) {
            loadTopicsFromDB();
        }
    }, [author, type]);

    useEffect(() => {
        if ((author !== "") & (type !== "") & (topic !== "")) {
            loadVarnameFromDB();
        }
    }, [author, type, topic]);

    // load authors from database
    function loadAuthorsFromDB() {
        axiosInstance
            .get(`/api/instrumentation/authors`)
            .then((res) => {
                console.log(res.data);
                setAuthors(res.data);
                setAuthor(res.data[0]);
            })
            .catch((err) => console.error(err));
    }

    // load authors from database
    function loadTypesFromDB() {
        axiosInstance
            .get(`/api/instrumentation/author/${author}/types`)
            .then((res) => {
                console.log(res.data);
                setTypes(res.data);
                setType(res.data[0]);
            })
            .catch((err) => console.error(err));
    }

    // load authors from database
    function loadTopicsFromDB() {
        axiosInstance
            .get(`/api/instrumentation/author/${author}/type/${type}/topics`)
            .then((res) => {
                console.log(res.data);
                var text = res.data;
                for (var i = 0; i < text.length; i++) {
                    text[i] = text[i].replace("iotUdeA/", "");
                }
                setTopics(text);
                setTopic(text[0]);
            })
            .catch((err) => console.error(err));
    }

    // load authors from database
    function loadVarnameFromDB() {
        axiosInstance
            .get(
                `/api/instrumentation/author/${author}/type/${type}/topic/${topic}/varnames`
            )
            .then((res) => {
                console.log(res.data);
                setVarnames(res.data);
                setVarname(res.data[0]);
            })
            .catch((err) => console.error(err));
    }

    // function to control on change event
    function onChangeHandle(e) {
        // identify the change
        if (e.target.id === "authorSelect") {
            console.log(e.target.value);
            setAuthor(e.target.value);
        }
        if (e.target.id === "typeSelect") {
            console.log(e.target.value);
            setType(e.target.value);
        }
        if (e.target.id === "topicSelect") {
            console.log(e.target.value);
            setTopic(e.target.value);
        }
        if (e.target.id === "variableSelect") {
            console.log(e.target.value);
            setVarname(e.target.value);
        }
    }

    // function to handle click
    function HandleClick(e) {
        // move to MQTT frontend
        if (e.target.id === "mqtt") {
            // setImprimir("Protocolo MQTT");
            navigate("/mqttProtocol", {
                state: {
                    type: type,
                    author: author,
                    subtopic: topic,
                    varname: varname,
                    title: "Eventos MQTT",
                },
            });
        }

        // move to WebSocket frontend
        if (e.target.id === "socket") {
            // setImprimir("Protocolo WebSocket");
            navigate("/websocketProtocol", {
                state: {
                    type: type,
                    author: author,
                    subtopic: topic,
                    varname: varname,
                    title: "Eventos WebSocket",
                },
            });
        }

        // move to WebServer frontend
        if (e.target.id === "server") {
            // setImprimir("Protocolo WebServer");
            navigate("/webserverProtocol", {
                state: {
                    type: type,
                    author: author,
                    subtopic: topic,
                    varname: varname,
                    title: "Eventos WebServer",
                },
            });
        }
    }

    return (
        <div>
            <div>
                <Navbar bg="light">
                    <Container>
                        <Navbar.Brand href="/">Semillero GIBIC</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Nav className="me-auto">
                            {type === "mqtt" && (
                                <Nav.Link
                                    id="mqtt"
                                    onClick={(e) => HandleClick(e)}
                                >
                                    Protocolo MQTT
                                </Nav.Link>
                            )}
                            {type === "websocket" && (
                                <Nav.Link
                                    id="socket"
                                    onClick={(e) => HandleClick(e)}
                                >
                                    Protocolo WebSocket
                                </Nav.Link>
                            )}
                            {type === "webserver" && (
                                <Nav.Link
                                    id="server"
                                    onClick={(e) => HandleClick(e)}
                                >
                                    Protocolo WebServer
                                </Nav.Link>
                            )}
                        </Nav>
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
            </div>

            <div>
                <div>
                    <Container className="p-5 mb-4 bg-light rounded-3">
                        <div className="d-flex flex-row">
                            <Card style={{ width: "25%" }}>
                                <Card.Header>Autor</Card.Header>
                                <Card.Body>
                                    <Form.Select
                                        id="authorSelect"
                                        onChange={(e) => {
                                            onChangeHandle(e);
                                        }}
                                    >
                                        {authors.map((values) => {
                                            return (
                                                <option value={values}>
                                                    {values}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                </Card.Body>
                            </Card>

                            <Card style={{ width: "25%" }}>
                                <Card.Header>Protocolo</Card.Header>
                                <Card.Body>
                                    <Form.Select
                                        id="typeSelect"
                                        onChange={(e) => {
                                            onChangeHandle(e);
                                        }}
                                    >
                                        {types.map((values) => {
                                            return (
                                                <option value={values}>
                                                    {values}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                </Card.Body>
                            </Card>

                            <Card style={{ width: "25%" }}>
                                <Card.Header>Tópico</Card.Header>
                                <Card.Body>
                                    <Form.Select
                                        id="topicSelect"
                                        onChange={(e) => {
                                            onChangeHandle(e);
                                        }}
                                    >
                                        {topics.map((values) => {
                                            return (
                                                <option value={values}>
                                                    {values}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                </Card.Body>
                            </Card>

                            <Card style={{ width: "25%" }}>
                                <Card.Header>Variable</Card.Header>
                                <Card.Body>
                                    <Form.Select
                                        id="variableSelect"
                                        onChange={(e) => {
                                            onChangeHandle(e);
                                        }}
                                    >
                                        {varnames.map((values) => {
                                            return (
                                                <option value={values}>
                                                    {values}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                </Card.Body>
                            </Card>
                        </div>
                    </Container>
                </div>
            </div>

            {/* <div>{imprimir}</div> */}
        </div>
    );
}
