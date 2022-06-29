import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { sendRequest } from "../utils/networkWrapper";
import { Link } from "react-router-native";

const Home = ({ user, refreshPage }) => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    refreshPage();
  }, []);
  useEffect(() => {
    if (!user) return;
    sendRequest("/chat/group/list", "get")
      .then(({ data }) => setGroups(data))
      .catch((err) => console.log(err.message));
  }, [user]);
  return (
    <View>
      <Text>
        Hello {user ? (user.role === "admin" ? "admin " : user.name) : "user"}
      </Text>
      {user && (
        <FlatList
          ListHeaderComponent={
            <View>
              <Text>Chat Groups</Text>
            </View>
          }
          data={groups}
          renderItem={({ item }) => (
            <Link to={`/group/${item.id}`}>
              <Text>{item.name}</Text>
            </Link>
          )}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
