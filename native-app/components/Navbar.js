import {
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  Button,
  TouchableHighlight,
} from "react-native";
import { Link } from "react-router-native";
import React, { useEffect, useRef } from "react";

const NavBar = ({ navOpen, setNavOpen }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const guestLinks = [
    { title: "Home", path: "/" },
    { title: "Login", path: "/login" },
    { title: "Register", path: "/register" },
  ];
  useEffect(() => {
    if (navOpen)
      Animated.timing(animatedWidth, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    if (!navOpen)
      Animated.timing(animatedWidth, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
  }, [navOpen]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        backgroundColor: "#555",
        height: "100%",
        width: animatedWidth.interpolate({
          inputRange: [0, 1],
          outputRange: ["0%", "40%"],
        }),
        overflow: "hidden",
        elevation: 5,
        opacity: 100,
      }}
    >
      <View style={styles.inner}>
        <View style={styles.buttonContainer}>
          <Text numberOfLines={1} style={styles.button}>
            Content
          </Text>
          <TouchableHighlight
            onPress={() => setNavOpen(false)}
            underlayColor={"#555"}
          >
            <Text numberOfLines={1} style={styles.button}>
              x
            </Text>
          </TouchableHighlight>
        </View>
        <FlatList
          data={guestLinks}
          renderItem={({ item }) => (
            <Link to={item.path} underlayColor={"#333"}>
              <Text numberOfLines={1} style={styles.text}>
                {item.title}
              </Text>
            </Link>
          )}
        />
      </View>
    </Animated.View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  inner: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-evenly",
  },
  text: {
    color: "white",
    alignItems: "center",
    padding: 10,
  },
  button: {
    color: "white",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#222",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#222",
    justifyContent: "space-between",
  },
});
