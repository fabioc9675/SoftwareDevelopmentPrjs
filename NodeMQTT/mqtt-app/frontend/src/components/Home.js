import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Home() {
    // URL history
    const navigate = useNavigate();

    // useState
    const [imprimir, setImprimir] = useState("");

    // function to handle click
    function HandleClick(e) {
        // move to MQTT frontend
        if (e.target.id === "mqtt") {
            setImprimir("Protocolo MQTT");
        }

        // move to WebSocket frontend
        if (e.target.id === "socket") {
            setImprimir("Protocolo WebSocket");
        }

        // move to WebServer frontend
        if (e.target.id === "server") {
            setImprimir("Protocolo WebServer");
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
                </Container>
            </Navbar>

            <div>{imprimir}</div>
        </div>
    );
}
