import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

const Message = ({ content, sender, date, user }) => {
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    if (sender.id === user.id) setIsUser(true);
  }, []);

  return (
    <View
      style={{ ...styles.message, ...styles[isUser ? "sent" : "received"] }}
    >
      <View style={styles.inner}>
        <Text>{isUser ? "You" : sender.name}</Text>
        <View>
          <Text>{content}</Text>
          <Text>{date}</Text>
        </View>
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  message: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 2,
  },
  inner: {
    display: "flex",
    width: "45%",
    backgroundColor: "#aaa",
    padding: 3,
    flexDirection: "column",
    borderRadius: 5,
  },
  sent: { justifyContent: "flex-end" },
  received: { justifyContent: "flex-start" },
});
