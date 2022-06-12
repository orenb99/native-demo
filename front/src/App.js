import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import "./styles/App.css";
function App() {
  const [type, setType] = useState("register");
  const [user, setUser] = useState();

  return (
    <div className="App">
      {user ? (
        <div className="user-home">hello {user.name}</div>
      ) : (
        <div className="guest-home">
          <div
            className="type-button register"
            onClick={() => {
              setType("register");
            }}
          >
            Register
          </div>
          <div
            className="type-button login"
            onClick={() => {
              setType("login");
            }}
          >
            Login
          </div>
          <Form type={type} />
        </div>
      )}
    </div>
  );
}

export default App;
