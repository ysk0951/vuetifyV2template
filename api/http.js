import axios from "axios";
import config from "config";

const instance = axios.create({
  baseURL: config.baseURL,
  port: config.port,
});

export default instance;
