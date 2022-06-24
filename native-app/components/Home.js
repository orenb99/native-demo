import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useEffect } from "react";

const Home = ({ user, refreshPage, closeNav }) => {
  useEffect(() => {
    refreshPage();
  }, []);
  return (
    <TouchableWithoutFeedback onPress={closeNav}>
      <View style={styles.page}>
        <Text>Hello {user ? user.name : "user"}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: { height: "100%" },
});
