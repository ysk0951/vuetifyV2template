import http from "./http";
import { version } from "./version";
const prefix = `${version}/common`;

export async function getCode(param) {
  return http.post(prefix + `/getCode?code=${param}`);
}

export async function getCodeAll(param) {
  return http.post(prefix + `/getCodeAll`, param);
}
