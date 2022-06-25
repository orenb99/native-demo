import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { NativeRouter as Router, Routes, Route } from "react-router-native";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { intercept, sendRequest, loaderMonitor } from "./utils/networkWrapper";
import OpenButton from "./components/OpenButton";
import Dashboard from "./components/Dashboard";
export default function App() {
  const animatedColor = useRef(new Animated.Value(0)).current;

  const http = "http://10.100.102.10:3001/api";
  const [navOpen, setNavOpen] = useState(false);
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (navOpen)
      Animated.timing(animatedColor, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    if (!navOpen)
      Animated.timing(animatedColor, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
  }, [navOpen]);

  useEffect(() => {
    if (user) return;
    sendRequest("/user/info", "get")
      .then(({ data }) => {
        const temp = { email: data.email, name: data.name, role: data.role };
        setUser(temp);
      })
      .catch(() => {});
  }, [refresh]);

  return (
    <Router>
      <StatusBar />
      <TouchableWithoutFeedback onPress={() => setNavOpen(false)}>
        <Animated.View
          style={{
            height: "100%",
            backgroundColor: animatedColor.interpolate({
              inputRange: [0, 1],
              outputRange: ["white", "rgba(0,0,0,0.8)"],
            }),
          }}
        >
          <OpenButton openNav={() => setNavOpen(true)} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home user={user} refreshPage={() => setRefresh(!refresh)} />
              }
            />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route
              exact
              path="/dashboard"
              element={<Dashboard user={user} />}
            />
          </Routes>
        </Animated.View>
      </TouchableWithoutFeedback>
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
const styles = StyleSheet.create({
  page: {
    height: "100%",
  },
});
