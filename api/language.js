import http from "./http";
import { version } from "./version";
const prefix = `${version}/message/`;

export async function getMessage(param) {
  console.log("message", param);
  return http.post(prefix + "getMessage", param);
}
