import axios from "axios";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";

import "./styles/App.css";
import { intercept, getHttp } from "./utils/networkWrapper";
function App() {
  const location = useLocation();
  const [user, setUser] = useState();

  useEffect(() => {
    if (!user) getUser();
  }, [location]);

  const getUser = () => {
    intercept();
    getHttp("/api/user/info", "accessToken")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setUser();
      });
  };

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="page" timeout={500}>
          <Routes>
            <Route exact path="/" element={<Home user={user} />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/login" element={<LoginPage />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
