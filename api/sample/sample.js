import http from "../http";
import { version } from "../version";
const prefix = `${version}/sample`;

export async function insertSample(param) {
  return http.post(prefix + `/insertSample`, param);
}

export async function memberSampleList(param) {
  return http.post(prefix + `/memberSampleList`, param);
}

export async function sampleSearch(param) {
  return http.post(prefix + `/sampleSearch`, param);
}

export async function updateSample(param) {
  return http.post(prefix + `/updateSample`, param);
}

export async function sampleMasterList(param) {
  return http.post(prefix + `/sampleMasterList`, param);
}

export async function sampleMasterDetail(param) {
  return http.post(prefix + `/sampleMasterDetail?code=${param}`);
}

export async function updateSampleMaster(param) {
  return http.post(prefix + `/updateSampleMaster`, param);
}
