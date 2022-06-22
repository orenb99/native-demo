import { useState, useEffect } from "react";
import { StyleSheet, View, Button, StatusBar } from "react-native";
import { NativeRouter as Router, Routes, Route } from "react-router-native";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <Router>
      <StatusBar />
      <Navbar navOpen={navOpen} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Routes>
      <Button title="press me" onPress={() => setNavOpen(!navOpen)} />
    </Router>
  );
}
