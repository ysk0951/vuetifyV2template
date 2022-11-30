import http from "./http";
import { version } from "./version";
const prefix = `${version}/menu/`;

export async function getMenu() {
  return http.post(prefix + "getMenu");
}
