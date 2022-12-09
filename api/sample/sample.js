import http from "../http";
import { version } from "../version";
const prefix = `${version}/sample`;

export async function insertSample(param) {
  return http.post(prefix + `/insertSample`, param);
}

export async function memberSampleList(param) {
  return http.post(prefix + `/memberSampleList`, param);
}
