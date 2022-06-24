import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import Form from "./Form";

const LoginPage = ({  }) => {
  return (
    <View>
      <Text style={styles.title}>Login</Text>
      <Form type="login" />
    </View>
  );
};

const styles = StyleSheet.create({
  title: { textAlign: "center", fontSize: 25, fontWeight: "bold" },
});

export default LoginPage;
