import React from "react";
import Home from "./Home";
import Query from "./Query";

import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <div>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/mqttProtocol" element={<Query />} />
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
