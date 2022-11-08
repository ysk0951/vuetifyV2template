import http from "../http";
export async function login(id, pw) {
  return http.post("/login", {
    id,
    pw,
  });
}

export async function searchUserId(param) {
  return http.post("/searchUserId", param);
}
