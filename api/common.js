import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

function getCommonCodeCombo(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_COMMON_CODE, param);
  return axios.get(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getCommonFavoritesList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_FAVORITES_LIST, param);
  return axios.get(httpUrl, params);
}

function setCommonFavoritesSave(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.PUT_FAVORITES_SAVE, param);
  return axios.put(httpUrl, params);
}

function getCommonUserInfo(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_USERINFO, param);
  console.log('getCommonUserInfo', param);
  return axios.get(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setCommonChangeLanguage(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.SET_CHANGE_LANGUAGE, param);
  return axios.put(httpUrl, params);
}

function getAddrInfo(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_ADDRINFO, param);
  return axios.get(httpUrl, params);
}

function putSaveUi(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.PUT_SAVE_UI, param);
  return axios.put(httpUrl, params);
}

function getPlantCombo(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_PLANT_COMBO, param);
  return axios.get(httpUrl, params);
}

function getTranList() {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.GET_TRAN_LSIT);
  return axios.get(httpUrl, params);
}

function getCredit(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.GET_BOOKING_CREDIT, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

export default {
  getCommonCodeCombo,
  getCommonFavoritesList,
  setCommonFavoritesSave,
  getCommonUserInfo,
  setCommonChangeLanguage,
  getAddrInfo,
  putSaveUi,
  getPlantCombo,
  getTranList,
  getCredit,
};
