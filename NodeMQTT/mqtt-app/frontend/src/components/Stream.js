import React, { useEffect, useState } from "react";
import { Card, Container, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";

export default function Stream() {
    // URL history
    const navigate = useNavigate();

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
    );
}
