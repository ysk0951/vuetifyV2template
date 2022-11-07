import http from "../http";
// import axios from "axios";
export async function login(id, pw) {
  console.log("fn", id, pw);
  return http.post("/login", {
    id,
    pw,
  });
}
