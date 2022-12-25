import http from "../http";
import { version } from "../version";
const prefix = `${version}/subsIndex`;

export async function insertSubsMaster(param) {
  return http.post(prefix + `/insertSubsMaster`, param);
}
export async function subsMasterDetail(param) {
  return http.post(prefix + `/subsMasterDetail`, param);
}
export async function subsMasterList(param) {
  return http.post(prefix + `/subsMasterList`, param);
}

export async function subsMasterRmav(param) {
  return http.post(prefix + `/subsMasterRmav`, param);
}

export async function updateSubsMaster(param) {
  return http.post(prefix + `/updateSubsMaster`, param);
}
