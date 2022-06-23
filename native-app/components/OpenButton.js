import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import React from "react";

const OpenButton = ({ openNav }) => {
  return (
    <View>
      <Icon.Button name="menu">
        <Text>enter</Text>
      </Icon.Button>
    </View>
  );
};

export default OpenButton;

const styles = StyleSheet.create({
  container: { alignSelf: "flex-start", padding: 10, backgroundColor: "#333" },
  text: { fontSize: 20 },
});
