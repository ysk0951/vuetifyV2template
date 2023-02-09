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

export async function insertSampleMaster(param) {
  return http.post(prefix + `/insertSampleMaster`, param);
}

export async function sampleRequestandstatus(param) {
  return http.post(prefix + `/sampleRequestandstatus`, param);
}

export async function sampleRequestandstatusadmin(param) {
  return http.post(prefix + `/sampleRequestandstatusadmin`, param);
}

export async function searchproduce(param) {
  return http.post(prefix + `/searchproduce`, param);
}

export async function produceupdate(param) {
  return http.post(prefix + `/produceupdate`, param);
}

export async function codedbcreate(param) {
  return http.post(prefix + `/codedbcreate`, param);
}

export async function codedbsearch(param) {
  return http.post(prefix + `/codedbsearch`, param);
}
