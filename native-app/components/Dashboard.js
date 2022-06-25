import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { sendRequest } from "../utils/networkWrapper";

const Dashboard = () => {
  const [userList, setUserList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [order, setOrder] = useState({ key: "name", order: "acc" });
  useEffect(() => {
    sendRequest("/admin/users", "get")
      .then(({ data }) => setUserList(data))
      .catch((err) => setErrorMessage(err.response.data));
  }, []);

  const orderBy = () => {};
  return (
    <View>
      <Text>Dashboard</Text>
      <FlatList
        data={userList}
        keyExtractor={(item) => item.name}
        ListHeaderComponent={
          <View style={styles.row}>
            <Text>name</Text>
            <Text>role</Text>
            <Text>joined</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.name}</Text>
            <Text>{item.role}</Text>
            <Text>{item.joined}</Text>
          </View>
        )}
      />
      <Text style={styles.error}>{errorMessage}</Text>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  error: { color: "red" },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
