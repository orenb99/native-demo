import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const http = "http://10.100.102.10:3001/api";

async function sendRequest(url, method, body) {
  intercept();
  const token = await AsyncStorage.getItem("accessToken");
  try {
    return axios[method](http + url, {
      headers: { authorization: "Bearer " + token },
      body,
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
        return axios
          .post(http + "/user/token", { token: refreshToken })
          .then(async ({ data }) => {
            await AsyncStorage.setItem("accessToken", data);
            err.config.headers["authorization"] = "Bearer " + data;
            return axios.request(err.config);
          })
          .catch(async (err) => {
            await AsyncStorage.clear();
          });
      }
      return Promise.reject(err);
    }
  );
}

function loaderMonitor(setLoader) {
  axios.interceptors.request.use(
    (config) => {
      setLoader(true);
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );
  axios.interceptors.response.use(
    (res) => {
      setLoader(false);
      return res;
    },
    function (err) {
      setLoader(false);

      return Promise.reject(err);
    }
  );
}
export { intercept, sendRequest, loaderMonitor };
