import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Form from "./components/Form";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

import "./styles/App.css";
import { intercept, getHttp } from "./utils/networkWrapper";
function App() {
  const [user, setUser] = useState();

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
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home user={user} getUser={getUser} />}
          />
          <Route exact path="/register" element={<Form type={"register"} />} />
          <Route exact path="/login" element={<Form type={"login"} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
