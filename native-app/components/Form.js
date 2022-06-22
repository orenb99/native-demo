import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = () => {
    if (!checkText()) return;
    axios
      .post("http://localhost:3001/api/user/login", { email, password })
      .then((res) => {
        console.log("login");
      })
      .catch((err) => setErrorMessage(err.response.data));
  };
  const register = () => {
    if (!checkText()) return;
    axios.post();
  };

  const checkText = () => {
    const passwordReg = /[a-zA-Z0-9]$/;
    const nameReg = /[a-zA-Z]$/;
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!password || !email) {
      setErrorMessage("One or more fields are missing");
      return false;
    }
    if (!email.match(emailReg)) {
      setErrorMessage("Invalid email");
      return false;
    }
    if (!password.match(passwordReg)) {
      setErrorMessage("Invalid password");
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
    setErrorMessage("ok");
    return true;
  };

  return (
    <View>
      <View style={styles.formContainer}>
        <View style={styles.formBlock}>
          <Text numberOfLines={1}>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.formBlock}>
          <Text numberOfLines={1}>Password:</Text>
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
            <Text numberOfLines={1}>Name:</Text>
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
          <Button
            title="submit"
            onPress={type === "register" ? register : login}
          />
        </View>
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
  formBlock: {
    display: "flex",
    flexDirection: "column",
  },
  error: { color: "red" },
});
