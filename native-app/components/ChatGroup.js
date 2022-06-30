import {
  FlatList,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-native";
import { sendRequest } from "../utils/networkWrapper";
import Message from "./Message";
import { socket } from "../utils/socket";

const ChatGroup = ({ user }) => {
  const { id } = useParams();
  const [messages, setMessages] = useState();
  const [users, setUsers] = useState();
  const [groupName, setGroupName] = useState("");
  const [textInput, setTextInput] = useState();

  const sendMessage = () => {
    if (!textInput) return;
    if (!textInput.trim()) return;
    sendRequest("/chat/create/message", "post", {
      sender: user.id,
      content: textInput,
      groupId: id,
    })
      .then(({ data }) => {
        setTextInput();
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    sendRequest(`/chat/group/${id}/messages`, "get")
      .then(({ data }) => {
        setGroupName(data.name);
        setMessages(data.messages);
        setUsers(data.users);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <View>
      <Text>{groupName}</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
      <View>
        {users && (
          <FlatList
            style={styles.messages}
            data={messages}
            renderItem={({ item }) => (
              <Message
                sender={users.find((element) => element.id === item.sender)}
                content={item.content}
                date={item.createdAt}
                user={user}
              />
            )}
          />
        )}
        <View>
          <TextInput value={textInput} onChangeText={setTextInput} />
          <Button title={"send"} onPress={sendMessage} />
        </View>
      </View>
    </View>
  );
};

export default ChatGroup;

const styles = StyleSheet.create({
  messages: {
    display: "flex",
    flexDirection: "column",
    height: "70%",
    overflow: "scroll",
  },
});
