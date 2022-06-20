import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { eraseCookie, readCookie } from "../utils/cookies";
import { CSSTransition } from "react-transition-group";
function Navbar({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    const refresh = readCookie("refreshToken");
    axios
      .delete("/api/user/logout", { token: refresh })
      .then((res) => {
        setUser();
        eraseCookie("refreshToken");
        eraseCookie("accessToken");
        navigate("/", { replace: true });
      })
      .catch((err) => {});
  };
  return (
    <div className="navbar">
      <div className="items">
        <NavLink
          to="/"
          onClick={(e) => {
            if (e.target.href.endsWith(location.pathname)) e.preventDefault();
          }}
        >
          Home
        </NavLink>
        {user ? (
          <>
            <NavLink to="/logout" onClick={logout}>
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              onClick={(e) => {
                if (e.target.href.endsWith(location.pathname))
                  e.preventDefault();
              }}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              onClick={(e) => {
                if (e.target.href.endsWith(location.pathname))
                  e.preventDefault();
              }}
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
