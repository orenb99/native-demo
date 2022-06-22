import { StyleSheet, Text, View, Animated } from "react-native";
import { Link } from "react-router-native";
import React, { useEffect, useRef } from "react";

const NavBar = ({ navOpen }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    console.log(navOpen);
    if (navOpen)
      Animated.timing(animatedWidth, { toValue: 1, duration: 500 }).start();
    if (!navOpen)
      Animated.timing(animatedWidth, { toValue: 0, duration: 500 }).start();
  }, [navOpen]);
  return (
    <Animated.View
      style={{
        position: "absolute",
        backgroundColor: "#AAA",
        height: "100%",
        width: animatedWidth.interpolate({
          inputRange: [0, 1],
          outputRange: ["0%", "30%"],
        }),
        overflow: "hidden",
        zIndex: "2",
      }}
    >
      <View style={styles.inner}>
        <Link to="/">
          <Text numberOfLines={1}>Home</Text>
        </Link>
        <Link to="/register">
          <Text numberOfLines={1}>Register</Text>
        </Link>
        <Link to="/login">
          <Text numberOfLines={1}>Login</Text>
        </Link>
      </View>
    </Animated.View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  inner: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    justifyContent: "space-evenly",
    flexShrink: "1",
  },
});
