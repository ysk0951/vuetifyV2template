import http from "../http";
import { version } from "../version";
const prefix = `${version}/member`;

export async function login(param) {
  return http.post(prefix + "/login", param);
}
export async function searchUserId(param) {
  return http.post(prefix + "/searchUserId", param);
}

export async function memberList(param) {
  return http.post(prefix + "/memberlist", param);
}

export async function sendAuthNum(param) {
  return http.post(prefix + "/sendAuthNum", param);
}

export async function authNumCheck(param) {
  return http.post(prefix + "/authNumCheck", param);
}

export async function memberJoin(param) {
  return http.post(prefix + "/memberJoin", param);
}

export async function sendTempPass(param) {
  return http.post(prefix + "/sendTempPass", param);
}
