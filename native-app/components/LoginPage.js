import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import Form from "./Form";
import axios from "axios";

const LoginPage = () => {
  return (
    <View>
      <Text>LoginPage</Text>
      <Form type="login" />
    </View>
  );
};

export default LoginPage;
