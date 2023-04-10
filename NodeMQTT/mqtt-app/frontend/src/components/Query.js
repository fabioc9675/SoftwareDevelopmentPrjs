import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useLocation, useNavigate } from "react-router";
import { axiosInstance } from "../config/config";
import moment from "moment";
import { Container, Navbar } from "react-bootstrap";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
    FaGithubSquare,
    FaWordpress,
    FaLinkedin,
    FaYoutube,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import DataChart from "./DataChart";
import DataTable from "./DataTable";

import "../styles/background.css";

export default function Query(props) {
    // component props
    const location = useLocation();
    const { author, type, subtopic, varname, title, topicText, eventText } =
        location.state;

    // Hooks of data
    const [data, setData] = useState("Hello Fabian!");
    const [instrumentObj, setInstrumentObj] = useState([
        {
            _id: 1,
            hour: 0,
            type: "",
            topic: "",
            author: "",
            varname: "",
            varvalue: 0,
        },
    ]);

    // URL history
    const navigate = useNavigate();

    // it is to do something  when application load
    // it is to do something when application load
    useEffect(() => {
        // load tensorflow model
        // tf.ready().then(() => {
        //   loadModel(url);
        // });

        // create the socket in the client
        const socket = io(axiosInstance.getUri(), {
            withCredentials: true,
            transports: ["websocket"],
        });
        console.log("connecting socket");
        // initialization of socket io in the client side
        socket.on("notify", (message) => {
            console.log(message);
            loadDataFromDB();
        });
        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        // loadDataFromDB();
    }, []);

    useEffect(() => {
        loadDataFromDB();
    }, []);

    // Load Data from database
    function loadDataFromDB() {
        axiosInstance
            .get(
                `/api/instrumentation/author/${author}/type/${type}/subtopic/${subtopic}/varname/${varname}`
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
                <h3 className="header" onClick={HandleClick}>
                    {title}
                </h3>{" "}
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
                <Container className="p-5 mb-4 rounded-3 shadow-lg bg-transparent">
                    <div className="d-flex flex-column">
                        <h2>Estructura de datos</h2>
                        <p>{topicText}</p>
                        <SyntaxHighlighter language={"json"} style={darcula}>
                            {eventText}
                        </SyntaxHighlighter>
                    </div>
                </Container>
                <DataTable data={instrumentObj} />
            </Container>
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
    );
}
