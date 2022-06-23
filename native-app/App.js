import { useState, useEffect } from "react";
import { StyleSheet, View, Button, StatusBar } from "react-native";
import { NativeRouter as Router, Routes, Route } from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
export default function App() {
  const http = "http://10.100.102.10:3001";
  const [navOpen, setNavOpen] = useState(false);
  const [user, setUser] = useState();
  return (
    <Router>
      <StatusBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Routes>
      <Button title="press me" onPress={() => setNavOpen(true)} />
      <Button
        title="read"
        onPress={async () => {
          const accessToken = await AsyncStorage.getItem("accessToken");
          const refreshToken = await AsyncStorage.getItem("refreshToken");
          console.log(accessToken, refreshToken);
        }}
      />
      <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />
    </Router>
  );
}
