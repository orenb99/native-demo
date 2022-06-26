import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import { sendRequest } from "../utils/networkWrapper";
import Icon from "react-native-vector-icons/AntDesign";

const Dashboard = () => {
  const [userList, setUserList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [sortingKey, setSortingKey] = useState("name");
  const [sortingAcc, setSortingAcc] = useState(true);

  useEffect(() => {
    sendRequest("/admin/users", "get")
      .then(({ data }) => setUserList(data))
      .catch((err) => setErrorMessage(err.response.data));
  }, []);

  const changeOrder = (type) => {
    if (type === sortingKey) {
      setSortingAcc(!sortingAcc);
    } else {
      setSortingAcc(true);
      setSortingKey(type);
    }
  };
  return (
    <View>
      <Text>Dashboard</Text>
      <FlatList
        data={userList.sort((a, b) =>
          sortingAcc
            ? a[sortingKey] > b[sortingKey]
            : a[sortingKey] < b[sortingKey]
        )}
        ListHeaderComponent={
          <View style={styles.row}>
            <TouchableHighlight onPress={() => changeOrder("name")}>
              <View
                style={
                  sortingKey === "name"
                    ? styles.titleViewActive
                    : styles.titleView
                }
              >
                <Text>name</Text>
                <Icon
                  name={
                    sortingKey === "name" && !sortingAcc
                      ? "caretup"
                      : "caretdown"
                  }
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => changeOrder("role")}>
              <View
                style={
                  sortingKey === "role"
                    ? styles.titleViewActive
                    : styles.titleView
                }
              >
                <Text>role</Text>
                <Icon
                  name={
                    sortingKey === "role" && !sortingAcc
                      ? "caretup"
                      : "caretdown"
                  }
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => changeOrder("joined")}>
              <View
                style={
                  sortingKey === "joined"
                    ? styles.titleViewActive
                    : styles.titleView
                }
              >
                <Text>joined</Text>
                <Icon
                  name={
                    sortingKey === "joined" && !sortingAcc
                      ? "caretup"
                      : "caretdown"
                  }
                />
              </View>
            </TouchableHighlight>
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
    borderBottomWidth: 1,
  },
  titleView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  titleViewActive: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
