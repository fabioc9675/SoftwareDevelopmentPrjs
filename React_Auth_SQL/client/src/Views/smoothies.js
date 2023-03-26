import React from "react";
import { useNavigate } from "react-router";

export default function Smoothies() {
  // URL history
  const navigate = useNavigate();
  // function to navigate to smoothies
  function handleClick() {
    navigate("/");
  }

  return (
    <div>
      <div>Hola roca</div>
      <button className="ui primary button basic" onClick={handleClick}>
        Go Home
      </button>
    </div>
  );
}
