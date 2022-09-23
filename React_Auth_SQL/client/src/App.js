import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/home";
import Smoothies from "./Views/smoothies";
import SignUp from "./Views/signup";
import LogIn from "./Views/login";
import { ProtectedRoute } from "./Routes/protected.route";
import auth from "./Routes/auth";

function App() {
  auth.isAuthenticated();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/smoothies"
            element={
              <ProtectedRoute auth={auth}>
                <Smoothies />
              </ProtectedRoute>
            }
          />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<LogIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
