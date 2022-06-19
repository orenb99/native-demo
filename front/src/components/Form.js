import React, { useState, useEffect } from "react";
import { createCookie } from "../utils/cookies";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Form({ type }) {
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    const nameInput = e.target.name.value;
    const emailInput = e.target.email.value;
    const passwordInput = e.target.password.value;
    axios
      .post("/api/user/register", {
        name: nameInput,
        email: emailInput,
        password: passwordInput,
      })
      .then((res) => {
        setErrorMessage("");
      })
      .catch((err) => setErrorMessage(err.response.data));
  };

  const login = (e) => {
    e.preventDefault();
    const emailInput = e.target.email.value;
    const passwordInput = e.target.password.value;
    axios
      .post("/api/user/login", {
        email: emailInput,
        password: passwordInput,
      })
      .then((res) => {
        setErrorMessage("");
        createCookie("refreshToken", res.data.refreshToken);
        createCookie("accessToken", res.data.accessToken, 1800000);
        navigate("/", { replace: "true" });
      })
      .catch((err) => setErrorMessage(err.response.data));
  };

  return (
    <div className="form">
      <div className="inner-form">
        <form onSubmit={type === "register" ? register : login}>
          {type === "register" ? (
            <div className="row">
              <label>name:</label>
              <input type="text" name="name" />
            </div>
          ) : (
            ""
          )}
          <div className="row">
            <label>email:</label>
            <input type="text" name="email" />
          </div>
          <div className="row">
            <label>password:</label>
            <input type="password" name="password" />
          </div>
          <div className="row">
            <input type={"submit"} />
          </div>
        </form>
        <div className="error-message">{errorMessage}</div>
      </div>
    </div>
  );
}
