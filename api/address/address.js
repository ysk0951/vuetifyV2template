import http from "../http";
import { version } from "../version";
const prefix = `${version}/addressbook`;

export async function addressbookDel(param) {
  return http.post(prefix + `/addressbookDel?idx=${param.idx}`);
}
export async function addressbookList(param) {
  return http.post(prefix + "/addressbookList", param);
}

export async function insertBook(param) {
  return http.post(prefix + "/insertBook", param);
}

export async function addressbookDefault(param) {
  return http.post(prefix + "/addressbookDefault", param);
}
