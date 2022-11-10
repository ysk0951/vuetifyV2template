import http from "../http";
export async function login(param) {
  return http.post("/login", param);
}
export async function searchUserId(param) {
  return http.post("/searchUserId", param);
}

export async function sendAuthNum(param) {
  return http.post("/sendAuthNum", param);
}

export async function authNumCheck(param) {
  return http.post("/authNumCheck", param);
}
