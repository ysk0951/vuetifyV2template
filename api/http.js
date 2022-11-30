import axios from "axios";
import config from "./config";
import store from "@/store/index";

const instance = axios.create(config);
instance.defaults.headers = {
  "Access-Control-Allow-Origin": "*",
};
instance.interceptors.request.use(function (config) {
  config.headers.Authorization = store.state.member.accessToken;
  store.state.loading.loading = true;
  return config;
});
instance.interceptors.response.use(
  function (response) {
    store.state.loading.loading = false;
    return response;
  },
  function (err) {
    store.state.loading.loading = false;
    return Promise.reject(err);
  }
);
export default instance;
