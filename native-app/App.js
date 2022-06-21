import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, button, Button } from "react-native";
import { NativeRouter as Router, Routes, Route } from "react-router-native";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import stylesheet from "./stylesheet.json";
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

const styles = StyleSheet.create(stylesheet);
