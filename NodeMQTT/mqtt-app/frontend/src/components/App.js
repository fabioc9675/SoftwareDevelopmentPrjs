import React from "react";
import Home from "./Home";

import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <div>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
