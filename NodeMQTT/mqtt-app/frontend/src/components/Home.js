import React from "react";
import { useNavigate } from "react-router";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Home() {
    // URL history
    const navigate = useNavigate();

    // useState
    // const [imprimir, setImprimir] = useState("");

    // function to handle click
    function HandleClick(e) {
        // move to MQTT frontend
        if (e.target.id === "mqtt") {
            // setImprimir("Protocolo MQTT");
            navigate("/mqttProtocol");
        }

        // move to WebSocket frontend
        if (e.target.id === "socket") {
            // setImprimir("Protocolo WebSocket");
            navigate("/websocketProtocol");
        }

        // move to WebServer frontend
        if (e.target.id === "server") {
            // setImprimir("Protocolo WebServer");
            navigate("/webserverProtocol");
        }
    }

    return (
        <div>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="/">Semillero GIBIC</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav className="me-auto">
                        <Nav.Link id="mqtt" onClick={(e) => HandleClick(e)}>
                            Protocolo MQTT
                        </Nav.Link>
                        <Nav.Link id="socket" onClick={(e) => HandleClick(e)}>
                            Protocolo WebSocket
                        </Nav.Link>
                        <Nav.Link id="server" onClick={(e) => HandleClick(e)}>
                            Protocolo WebServer
                        </Nav.Link>
                    </Nav>
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

            {/* <div>{imprimir}</div> */}
        </div>
    );
}
