import React from "react";
import { useNavigate } from "react-router";

import TaskList from "../Components/taskList";
import auth from "../Routes/auth";

export default function Home() {
  // URL history
  const navigate = useNavigate();
  // function to navigate to smoothies
  function handleClick(e) {
    if (e.target.name === "smoothie") {
      navigate("/smoothies");
    }
    if (e.target.name === "login") {
      navigate("/login");
    }
    if (e.target.name === "signup") {
      navigate("/signup");
    }
    if (e.target.name === "logout") {
      auth.logout();
    }
  }

  return (
    <div>
      <div>Hi, I am Home</div>
      <TaskList />
      <div>
        <button
          className="ui primary button basic"
          name="smoothie"
          onClick={(e) => handleClick(e)}
        >
          Go Smoothies
        </button>
        <button
          className="ui primary button basic"
          name="login"
          onClick={(e) => handleClick(e)}
        >
          Go Login
        </button>
        <button
          className="ui primary button basic"
          name="signup"
          onClick={(e) => handleClick(e)}
        >
          Go SignUp
        </button>
        <button
          className="ui red button basic"
          name="logout"
          onClick={(e) => handleClick(e)}
        >
          Go Logout
        </button>
      </div>
    </div>
  );
}
