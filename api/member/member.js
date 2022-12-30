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

export async function getRoleList() {
  return http.post(prefix + "/getRoleList");
}
export async function resetPass(param) {
  return http.post(prefix + "/resetPass?memberId=" + param);
}

export async function updateRole(param) {
  return http.post(
    prefix + `/updateRole?roleName=${param.roleName}&roles=${param.roles}`
  );
}

export async function newPass(param) {
  let url =
    prefix + `/newPass?memberId=${param.memberId}&memberPw=${param.memberPw}`;
  url = url.replace(/#/, "%23");
  return http.post(url);
}
