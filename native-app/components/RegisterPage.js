import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import Form from "./Form";

const RegisterPage = ({}) => {
  return (
    <View>
      <Text style={styles.title}>Register</Text>
      <Form type="register" />
    </View>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  title: { textAlign: "center", fontSize: 25, fontWeight: "bold" },
});
