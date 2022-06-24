import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import { NativeRouter as Router, Routes, Route } from "react-router-native";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { intercept, getHttp, loaderMonitor } from "./utils/networkWrapper";
import OpenButton from "./components/OpenButton";
export default function App() {
  const http = "http://10.100.102.10:3001";
  const [navOpen, setNavOpen] = useState(false);
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    // loaderMonitor(setLoader);
  }, []);
  useEffect(() => {
    if (user) return;
    intercept();
    getHttp(http + "/api/user/info", "accessToken")
      .then(({ data }) => {
        const temp = { email: data.email, name: data.name, role: data.role };
        setUser(temp);
      })
      .catch(() => {});
  }, [refresh]);

  return (
    <Router>
      <StatusBar />
      <OpenButton
        openNav={() => setNavOpen(true)}
        closeNav={() => setNavOpen(false)}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              user={user}
              refreshPage={() => setRefresh(!refresh)}
              closeNav={() => setNavOpen(false)}
            />
          }
        />
        <Route
          exact
          path="/login"
          element={<LoginPage closeNav={() => setNavOpen(false)} />}
        />
        <Route
          exact
          path="/register"
          element={<RegisterPage closeNav={() => setNavOpen(false)} />}
        />
      </Routes>
      <Navbar
        navOpen={navOpen}
        closeNav={() => setNavOpen(false)}
        setUser={setUser}
        user={user}
        http={http}
      />
    </Router>
  );
}
