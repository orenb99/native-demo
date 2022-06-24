import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import React from "react";

const OpenButton = ({ openNav }) => {
  return (
    <View style={styles.container}>
      <Icon.Button
        name="menu"
        onPress={openNav}
        color={"black"}
        backgroundColor={"white"}
        size={30}
      />
    </View>
  );
};

export default OpenButton;

const styles = StyleSheet.create({
  container: { alignSelf: "flex-start", flexDirection: "row" },
  text: { fontSize: 20 },
});
