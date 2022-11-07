import axios from "axios";
import config from "./config";

const instance = axios.create(config);
instance.defaults.headers = {
  "Access-Control-Allow-Origin": "*",
};
export default instance;
