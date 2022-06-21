import { StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";
import React from "react";

const NavBar = () => {
  return (
    <View style={styles.navbar}>
      <View style={styles.inner}>
        <Link to="/">
          <Text>Home</Text>
        </Link>
        <Link to="/register">
          <Text>Register</Text>
        </Link>
        <Link to="/login">
          <Text>Login</Text>
        </Link>
      </View>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#AAA",
    padding: 20,
  },
  inner: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-evenly",
  },
});
