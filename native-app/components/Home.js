import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useEffect } from "react";

const Home = ({ user, refreshPage }) => {
  useEffect(() => {
    refreshPage();
  }, []);
  return (
    <View>
      <Text>
        Hello {user ? (user.role === "admin" ? "admin " : user.name) : "user"}
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
