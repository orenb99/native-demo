import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

const Home = ({ user, refreshPage }) => {
  useEffect(() => {
    refreshPage();
  }, []);
  return (
    <View style={styles.home}>
      <Text>Hello {user ? user.name : "user"}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: { zIndex: 1, elevation: 1 },
});
