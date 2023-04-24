import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Container, Nav, Navbar, Form, Card, Figure } from "react-bootstrap";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
    FaGithubSquare,
    FaWordpress,
    FaLinkedin,
    FaYoutube,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { axiosInstance } from "../config/config";

import "../styles/background.css";

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
                    topicText: "Tópico = iotUdeA/<topico>",
                    eventText: `{\n\t"author":"<Nombre>",\n\t"varname":"<Variable>",\n\t"varvalue":<Valor>\n}`,
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
                    topicText: "Evento = iotUdeA/<event>",
                    eventText: `{"<event>":{"author":"<Nombre>", "varname":"<variable>", "varvalue":<valor>}}'`,
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
                    topicText: "WebServer = POST request",
                    eventText: `curl -X POST https://iotudeab4a1-fabioc9675.b4a.run/<API> \n\t-H "Content-Type: application/json" \n\t-d '{"topic": "iotUdeA/<webPost>", "author":"<Nombre>", "type":"webserver", "varname":"<variable>", "varvalue":<valor>}'`,
                },
            });
        }

        // move to WebServer frontend
        if (e.target.id === "mqttStream") {
            // setImprimir("Protocolo WebServer");
            navigate("/mqttStream");
        }
    }

    return (
        <div className="global-background">
            <Navbar className="sticky-top" bg="light">
                <Container>
                    <Navbar.Brand href="/">
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
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav className="me-auto">
                        {type === "mqtt" && (
                            <Nav.Link id="mqtt" onClick={(e) => HandleClick(e)}>
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
                        <Nav.Link
                            id="mqttStream"
                            onClick={(e) => HandleClick(e)}
                        >
                            MQTT Streaming
                        </Nav.Link>
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

            <div>
                <div className="d-flex flex-row">
                    <Container
                        className="p-5 mb-4 rounded-3 shadow-lg bg-transparent"
                        style={{ width: "100%" }}
                    >
                        <div className="d-flex flex-row">
                            <div
                                className="d-flex flex-column"
                                style={{ width: "48%", padding: "1%" }}
                            >
                                <h2>Estructura de datos MQTT</h2>
                                <p>{`Tópico = iotUdeA/<topico>`}</p>
                                <SyntaxHighlighter
                                    language={"json"}
                                    style={darcula}
                                >
                                    {`{\n\t"author":"<Nombre>",\n\t"varname":"<Variable>",\n\t"varvalue":<Valor>\n}`}
                                </SyntaxHighlighter>
                            </div>
                            <div
                                className="d-flex flex-column shadow"
                                style={{
                                    width: "50%",
                                    padding: "1%",
                                    background: "#C0DBE8",
                                }}
                            >
                                <Figure>
                                    <Figure.Image
                                        width="100%"
                                        alt="171x180"
                                        src="mqtt_protocol.png"
                                    />
                                    <Figure.Caption>
                                        Protocolo MQTT
                                    </Figure.Caption>
                                </Figure>
                            </div>
                        </div>
                    </Container>
                </div>

                <div className="d-flex flex-row">
                    <Container
                        className="p-5 mb-4 rounded-3 shadow-lg bg-transparent"
                        style={{ width: "100%" }}
                    >
                        <div className="d-flex flex-row">
                            <div
                                className="d-flex flex-column"
                                style={{ width: "48%", padding: "1%" }}
                            >
                                <h2>Estructura de datos WebSocket</h2>
                                <p>{`Evento = iotUdeA/<event>`}</p>
                                <SyntaxHighlighter
                                    language={"json"}
                                    style={darcula}
                                >
                                    {`{\n\t"<event>":\n\t{\n\t\t"author":"<Nombre>", \n\t\t"varname":"<variable>", \n\t\t"varvalue":<valor>\n\t}\n}'`}
                                </SyntaxHighlighter>
                            </div>
                            <div
                                className="d-flex flex-column shadow"
                                style={{
                                    width: "50%",
                                    padding: "1%",
                                    background: "#C0DBE8",
                                }}
                            >
                                <Figure>
                                    <Figure.Image
                                        width="100%"
                                        alt="171x180"
                                        src="websocket_protocol.png"
                                    />
                                    <Figure.Caption>
                                        Protocolo WebSocket
                                    </Figure.Caption>
                                </Figure>
                            </div>
                        </div>
                    </Container>
                </div>

                <div className="d-flex flex-row">
                    <Container
                        className="p-5 mb-4 rounded-3 shadow-lg bg-transparent"
                        style={{ width: "100%" }}
                    >
                        <div className="d-flex flex-row">
                            <div
                                className="d-flex flex-column"
                                style={{ width: "48%", padding: "1%" }}
                            >
                                <h2>Estructura de datos WebServer</h2>
                                <p>{`WebServer = API REST`}</p>
                                <SyntaxHighlighter
                                    language={"json"}
                                    style={darcula}
                                >
                                    {`curl -X POST https://iotudeab4a1-fabioc9675.b4a.run/<API> \n\t-H "Content-Type: application/json" \n\t-d '{\n\t\t"topic": "iotUdeA/<webPost>", \n\t\t"author":"<Nombre>", \n\t\t"type":"webserver", \n\t\t"varname":"<variable>", \n\t\t"varvalue":<valor>\n\t}'`}
                                </SyntaxHighlighter>
                            </div>
                            <div
                                className="d-flex flex-column shadow"
                                style={{
                                    width: "50%",
                                    padding: "1%",
                                    background: "#C0DBE8",
                                }}
                            >
                                <Figure>
                                    <Figure.Image
                                        width="100%"
                                        alt="171x180"
                                        src="webserver_protocol.png"
                                    />
                                    <Figure.Caption>
                                        Protocolo WebServer
                                    </Figure.Caption>
                                </Figure>
                            </div>
                        </div>
                    </Container>
                </div>
                <Navbar className="sticky-bottom" bg="dark">
                    <Container>
                        <Navbar.Collapse>
                            <Navbar.Brand href="https://www.fabiancastano.com">
                                <FaWordpress size={30} color="white" />
                            </Navbar.Brand>{" "}
                            <Navbar.Brand href="https://github.com/fabioc9675">
                                <FaGithubSquare size={30} color="white" />
                            </Navbar.Brand>{" "}
                            <Navbar.Brand href="mailto:fabioc9675@gmail.com">
                                <MdEmail size={30} color="white" />
                            </Navbar.Brand>{" "}
                            <Navbar.Brand href="https://www.linkedin.com/in/fabian-castano-83412536">
                                <FaLinkedin size={30} color="white" />
                            </Navbar.Brand>{" "}
                            <Navbar.Brand href="https://www.youtube.com/channel/UCWdd0P8N_Ug6H5iSZgOykQg">
                                <FaYoutube size={30} color="white" />
                            </Navbar.Brand>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

            {/* <div>{imprimir}</div> */}
        </div>
    );
}
