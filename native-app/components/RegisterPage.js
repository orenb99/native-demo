import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import Form from "./Form";

const RegisterPage = ({ closeNav }) => {
  return (
    <TouchableWithoutFeedback onPress={closeNav}>
      <View style={styles.page}>
        <Text style={styles.title}>Register</Text>
        <Form type="register" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  title: { textAlign: "center", fontSize: 25, fontWeight: "bold" },
  page: { height: "100%" },
});
