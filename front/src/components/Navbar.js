import axios from "axios";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { eraseCookie, readCookie } from "../utils/cookies";
function Navbar() {
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    const refresh = readCookie("refreshToken");
    axios
      .delete("/api/user/logout", { token: refresh })
      .then((res) => {
        eraseCookie("refreshToken");
        eraseCookie("accessToken");
        navigate("/", { replace: true });
      })
      .catch((err) => {});
  };
  return (
    <div className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="" onClick={logout}>
        Logout
      </NavLink>
    </div>
  );
}

export default Navbar;
