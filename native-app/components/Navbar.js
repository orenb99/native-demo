import {
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { Link, useNavigate } from "react-router-native";
import React, { useEffect, useRef } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NavBar = ({ navOpen, closeNav, user, http, setUser }) => {
  const navigate = useNavigate();
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const guestLinks = [
    { title: "Home", path: "/" },
    { title: "Login", path: "/login" },
    { title: "Register", path: "/register" },
  ];
  const userLinks = [
    { title: "Home", path: "/" },
    { title: "Logout", path: "/logout" },
  ];

  const Logout = async (e) => {
    e.preventDefault();
    const token = await AsyncStorage.getItem("refreshToken");
    axios
      .delete(http + "/api/user/logout", { token })
      .then(async () => {
        await AsyncStorage.clear();
        closeNav();
        setUser();
        navigate("/login", { replace: true });
      })
      .catch(() => {});
  };

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
          <TouchableHighlight onPress={closeNav} underlayColor={"#555"}>
            <Text numberOfLines={1} style={styles.button}>
              X
            </Text>
          </TouchableHighlight>
        </View>
        <FlatList
          data={user ? userLinks : guestLinks}
          renderItem={({ item }) => (
            <Link
              to={item.path}
              underlayColor={"#333"}
              onPress={item.title === "Logout" ? Logout : closeNav}
            >
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
    fontSize: 17,
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
