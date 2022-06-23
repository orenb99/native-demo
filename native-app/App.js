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
      {loader ? (
        <Text>loading...</Text>
      ) : (
        <>
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
          </Routes>
          {/* <Button title="clear" onPress={async () => await AsyncStorage.clear()} /> */}
          <Navbar
            navOpen={navOpen}
            closeNav={() => setNavOpen(false)}
            setUser={setUser}
            user={user}
            http={http}
          />
        </>
      )}
    </Router>
  );
}
