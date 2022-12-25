import http from "../http";
import { version } from "../version";
const prefix = `${version}/solvent`;

export async function solventMasterList(param) {
  return http.post(prefix + `/solventMasterList`, param);
}

export async function solventMasterDetail(param) {
  return http.post(prefix + `/solventMasterDetail`, param);
}

export async function insertSolventMaster(param) {
  return http.post(prefix + `/insertSolventMaster`, param);
}

export async function updateSolventMaster(param) {
  return http.post(prefix + `/updateSolventMaster`, param);
}
