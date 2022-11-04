import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

function getNoticeList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.UTILITY.NOTICE.GET_NOTICE_LIST, param);
  return axios.get(httpUrl);
}

function getNotice(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.UTILITY.NOTICE.GET_NOTICE, param);
  return axios.get(httpUrl);
}

function getManualList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.UTILITY.MANUAL.GET_MANUAL_LIST, param);
  return axios.get(httpUrl);
}

function getManual(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.UTILITY.MANUAL.GET_MANUAL, param);
  return axios.get(httpUrl);
}

function saveFileUtility(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.UTILITY.UTILITY_COMMON.FILE_DOWNLOAD, param);
  return axios.get(httpUrl, { responseType: 'blob', responseFileNm: param.fileNm });
}

function saveBbsPost(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.UTILITY.UTILITY_COMMON.SAVE_BBSPOST, param);
  return axios.put(httpUrl, params);
}

function removeBbsPost(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.UTILITY.UTILITY_COMMON.REMOVE_BBSPOST, param);
  return axios.put(httpUrl, params);
}

function removeBbsPostFile(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.UTILITY.UTILITY_COMMON.REMOVE_BBSPOST_FILE, param);
  return axios.put(httpUrl, params);
}

export default {
  getNoticeList,
  getNotice,
  getManualList,
  getManual,
  saveFileUtility,
  saveBbsPost,
  removeBbsPost,
  removeBbsPostFile,
};
