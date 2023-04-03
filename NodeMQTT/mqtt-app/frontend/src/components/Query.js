import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";
import { axiosInstance } from "../config/config";
import moment from "moment";

import DataChart from "./DataChart";

export default function Query(props) {
    // component props
    const { author, subtopic } = props;

    // Hooks of data

    // URL history
    const navigate = useNavigate();

    // it is to do something  when application load
    useEffect(() => {
        loadDataFromDB();
    }, []);

    // Load Data from database
    function loadDataFromDB() {
        axiosInstance
            .get(`/api/instrumentation/author/${author}/subtopic/${subtopic}`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.error(err));
    }
}
