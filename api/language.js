import http from "./http";
import { version } from "./version";
const prefix = `${version}/message/`;

export async function getMessage(param) {
  return http.post(prefix + "getMessage", param);
}

export async function getMessageList(param) {
  return http.post(prefix + "getMessageList", param);
}

export async function updateMessage(param) {
  return http.post(prefix + "updateMessage", param);
}
