import http from "../http";
import { version } from "../version";
const prefix = `${version}/sample`;

export async function insertSample(param) {
  return http.post(prefix + `/insertSample`, param);
}

export async function memberSampleList(param) {
  return http.post(prefix + `/memberSampleList`, param);
}

export async function memberSampleListAdm(param) {
  return http.post(prefix + `/memberSampleListAdm`, param);
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

export async function updateAddress(param) {
  return http.post(prefix + `/updateAddress`, param);
}

export async function dashcount(param) {
  return http.post(prefix + `/dashcount`, param);
}

export async function dashdelivery(param) {
  return http.post(prefix + `/dashdelivery`, param);
}

export async function dashdeliverydelay(param) {
  return http.post(prefix + `/dashdeliverydelay`, param);
}

export async function dashproducedelay(param) {
  return http.post(prefix + "/dashproducedelay", param);
}

export async function dashnew(param) {
  return http.post(prefix + `/dashnew`, param);
}
export async function progress(param) {
  return http.post(prefix + `/progress`, param);
}

export async function resultsList(param) {
  return http.post(prefix + `/resultsList`, param);
}

export async function resultsUpdate(param) {
  return http.post(prefix + `/resultsUpdate`, param);
}

export async function produceReportlist(param) {
  return http.post(prefix + `/produceReportlist`, param);
}

export async function produceReportDetail(param) {
  return http.post(prefix + `/produceReportDetail`, param);
}

export async function produceReportUpdate(param) {
  return http.post(prefix + `/produceReportUpdate`, param);
}

export async function coalist(param) {
  return http.post(prefix + `/coalist`, param);
}
export async function coadetail(param) {
  return http.post(prefix + `/coadetail`, param);
}
export async function coaUpdate(param) {
  return http.post(prefix + `/coaUpdate`, param);
}

export async function coaPDFupload(form) {
  return http.post(prefix + `/coaPDFupload`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
