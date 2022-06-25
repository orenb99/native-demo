import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Form = ({ type }) => {
  const navigate = useNavigate();
  const http = "http://10.100.102.10:3001";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = () => {
    if (!checkText()) return;
    axios
      .post(http + "/api/user/login", { email, password })
      .then(async ({ data }) => {
        await AsyncStorage.multiSet(
          [
            ["accessToken", data.accessToken],
            ["refreshToken", data.refreshToken],
          ],
          (err) => {
            setErrorMessage("task didn't finish");
          }
        );
        navigate("/", { replace: true });
      })
      .catch((err) => setErrorMessage(err.response.data));
  };
  const register = () => {
    if (!checkText()) return;
    axios
      .post(http + "/api/user/register", { email, password, name })
      .then(() => {
        navigate("/login", { replace: true });
      })
      .catch((err) => setErrorMessage(err.response.data));
  };

  const checkText = () => {
    const passwordReg = /[a-zA-Z0-9]{8}$/;
    const nameReg = /[a-zA-Z]$/;
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!password || !email) {
      setErrorMessage("One or more fields are missing");
      return false;
    }
    if (!email.match(emailReg)) {
      if (type === "register") setErrorMessage("Invalid email");
      if (type === "login") setErrorMessage("User not found");

      return false;
    }
    if (!password.match(passwordReg)) {
      if (type === "register") setErrorMessage("Invalid password");
      if (type === "login") setErrorMessage("User not found");
      return false;
    }
    if (type === "register") {
      if (!name) {
        setErrorMessage("One or more fields are missing");
        return false;
      }
      if (!name.match(nameReg)) {
        setErrorMessage("Invalid name");
        return false;
      }
    }
    return true;
  };

  return (
    <View>
      <View style={styles.formContainer}>
        <View style={styles.formBlock}>
          <Text numberOfLines={1}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.formBlock}>
          <Text numberOfLines={1}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.input}
            autoCapitalize="none"
          />
        </View>
        {type === "register" && (
          <View style={styles.formBlock}>
            <Text numberOfLines={1}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
        )}
        <View style={styles.formBlock}>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
        <View style={styles.formBlock}>
          <View style={styles.buttonContainer}>
            <Button
              title="submit"
              onPress={type === "register" ? register : login}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    alignSelf: "center",
    alignContent: "center",
  },
  formBlock: {
    display: "flex",
    flexDirection: "column",
  },
  buttonContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "red",
    alignSelf: "center",
  },
  error: { color: "red" },
});
