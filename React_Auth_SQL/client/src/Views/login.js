import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

import auth from "../Routes/auth";

export default function LogIn(props) {
  // URL history
  const navigate = useNavigate();

  const [message, setMessage] = useState();
  const [request, setRequest] = useState();
  const [username, setUsername] = useState();
  const [userpass, setUserpass] = useState();
  const [usermail, setUsermail] = useState();
  const [userError, setUserError] = useState();
  const [passError, setPassError] = useState();
  const [mailError, setMailError] = useState();

  useEffect(() => {
    // console.log("component was mounted");
    const socket = io("http://localhost:4000", {
      transports: ["websocket", "polling", "flashsocket"], // adding permissions to socket
    });

    // initialization of socket io in client side
    socket.on("logMessage", (message) => {
      console.log(message);

      toast(message.toString());
    });

    axios
      .get("http://localhost:4000/login")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      socket.disconnect();
    };
  }, []);

  function handleBackClick() {
    navigate("/");
  }

  function handleClick() {
    const jsonPipe = JSON.stringify({
      USER_NAME: username,
      USER_PASS: userpass,
      USER_TOKEN: "thisIsAToken",
      USER_MAIL: usermail,
    });
    console.log(jsonPipe);

    setUserError("");
    setPassError("");
    setMailError("");

    // calling of endpoint

    logPost(jsonPipe)
      .then((response) => {
        setRequest(response.data.USER_ID);
        auth.login();
        // navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setRequest(
          error.response.data.USER_NAME +
            ":" +
            error.response.data.USER_PASS +
            ":" +
            error.response.data.USER_MAIL
        );
        setUserError(error.response.data.USER_NAME);
        setPassError(error.response.data.USER_PASS);
        setMailError(error.response.data.USER_MAIL);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  // async function to make the request to the database
  async function logPost(jsonData) {
    const response = await axios.post("http://localhost:4000/login", jsonData, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
      withCredentials: true, // necessary to receive cookies
    });

    return response;
  }

  return (
    <div className="ui raised very padded text container segment">
      <form className="ui form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Log In Form</h1>
        <div className="ui left icon input">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <i className="users icon"></i>
        </div>
        <div className="users error ">{userError}</div>
        <div className="ui divider"></div>
        <div className="ui left icon input">
          <input
            type="email"
            name="usermail"
            placeholder="Email"
            value={usermail}
            onChange={(e) => {
              setUsermail(e.target.value);
            }}
          ></input>
          <i className="mail icon"></i>
        </div>
        <div className="email error">{mailError}</div>
        <div className="ui divider"></div>
        <div className="ui left icon input">
          <input
            type="password"
            name="userpass"
            placeholder="Password"
            value={userpass}
            onChange={(e) => {
              setUserpass(e.target.value);
            }}
          ></input>
          <i className="key icon"></i>
        </div>
        <div className="password error">{passError}</div>
        <div className="ui divider"></div>
        {/*<h4>{message}</h4>*/}

        <button className="ui green button basic" onClick={() => handleClick()}>
          Send request
        </button>
        <button
          className="ui red button basic"
          onClick={() => handleBackClick()}
        >
          Cancel request
        </button>
        <h4>{request}</h4>
      </form>
      <ToastContainer />
    </div>
  );
}
