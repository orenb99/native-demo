import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import Form from "./Form";

const LoginPage = () => {
  return (
    <View>
      <Text>LoginPage</Text>
      <Form type="login" />
    </View>
  );
};

export default LoginPage;
