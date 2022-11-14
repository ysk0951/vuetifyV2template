import http from "./http";
export async function getMessage(param) {
  console.log("message", param);
  return http.post("/getMessage", param);
}
