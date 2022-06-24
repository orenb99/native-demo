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

const LoginPage = ({ closeNav }) => {
  return (
    <TouchableWithoutFeedback onPress={closeNav}>
      <View style={styles.page}>
        <Text style={styles.title}>Login</Text>
        <Form type="login" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  title: { textAlign: "center", fontSize: 25, fontWeight: "bold" },
  page: { height: "100%" },
});

export default LoginPage;
