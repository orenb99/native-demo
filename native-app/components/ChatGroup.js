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

const ChatGroup = ({ user }) => {
  const { id } = useParams();
  const [messages, setMessages] = useState();
  const [users, setUsers] = useState();
  const [groupName, setGroupName] = useState("");
  const [textInput, setTextInput] = useState();

  const sendMessage = () => {
    setTextInput();
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
        <FlatList
          data={messages}
          renderItem={({ item }) =>
            users && (
              <View>
                <Text>
                  {users.find((element) => element.id === item.sender).name +
                    ": " +
                    item.content}
                </Text>
              </View>
            )
          }
        />
        <View>
          <TextInput value={textInput} onChangeText={setTextInput} />
          <Button title={"send"} onPress={sendMessage} />
        </View>
      </View>
    </View>
  );
};

export default ChatGroup;

const styles = StyleSheet.create({});
