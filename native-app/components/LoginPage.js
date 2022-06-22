import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const submit = () => {
    console.log({ email, password, name });
  };

  return (
    <View>
      <Text>LoginPage</Text>
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
        <View style={styles.formBlock}>
          <Text numberOfLines={1}>Name:</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.formBlock}>
          <Button title="submit" onPress={submit} />
        </View>
      </View>
    </View>
  );
};

export default LoginPage;

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
});
