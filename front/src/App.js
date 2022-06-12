import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import "./styles/App.css";
import { intercept, getHttp } from "./utils/networkWrapper";
function App() {
  const [type, setType] = useState("register");
  const [user, setUser] = useState();

  const getUser = () => {
    intercept();
    getHttp("/api/user/info", "accessToken");
  };

  return (
    <div className="App">
      {user ? (
        <div className="user-home">hello {user.name}</div>
      ) : (
        <div className="guest-home">
          <button
            className="type-button register"
            onClick={() => {
              setType("register");
            }}
          >
            Register
          </button>
          <button
            className="type-button login"
            onClick={() => {
              setType("login");
            }}
          >
            Login
          </button>
          <button onClick={getUser} />
          <Form type={type} />
        </div>
      )}
    </div>
  );
}

export default App;
