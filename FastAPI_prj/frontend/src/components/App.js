import React, { useState } from "react";
import { axiosInstance } from "../config/config";

function App() {
    const [text, setText] = useState();

    function loadDataFromDB() {
        axiosInstance
            .get(`/users`)
            .then((res) => {
                console.log(res);
                setText(JSON.stringify(res.data));
            })
            .catch((err) => console.error(err));
    }

    function eventHandler() {
        loadDataFromDB();
    }

    return (
        <div className="App">
            <h1>Hello World</h1>
            <p>{text}</p>
            <button onClick={eventHandler}>Presioname</button>
        </div>
    );
}

export default App;
