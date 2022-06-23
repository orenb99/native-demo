import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const http = "http://10.100.102.10:3001";

async function getHttp(url, tokenName) {
  const token = await AsyncStorage.getItem(tokenName);
  try {
    return axios.get(url, {
      headers: { authorization: "Bearer " + token },
    });
  } catch (err) {
    return err;
  }
}

function intercept() {
  axios.interceptors.response.use(
    (res) => res,
    async (err) => {
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      if (refreshToken && err.message.slice(-3) === "403") {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (!accessToken)
          return axios
            .post(http + "/api/user/token", { token: refreshToken })
            .then(async ({ data }) => {
              await AsyncStorage.setItem("accessStorage", data);
              err.config.headers["authorization"] = "Bearer " + data;
              return axios.request(err.config);
            })
            .catch(async (err) => await AsyncStorage.clear());
      }
      return Promise.reject(err);
    }
  );
}
export { intercept, getHttp };
