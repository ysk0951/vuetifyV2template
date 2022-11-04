import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

function getMenuList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.MENU.GET_MENU_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getMenuDetail(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.MENU.GET_MENU_DETAIL, param);
  return axios.get(httpUrl);
  //.then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getMenuButtonAuth(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.MENU.GET_MENU_BTN_AUTH, param);
  return axios.get(httpUrl);
  //.then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setMenu(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.MENU.SET_MENU, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setMenuDetail(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.MENU.SET_MENU_DETAIL, param);
  return axios.put(httpUrl, param).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setMenuBtnAuth(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.MENU.SET_MENU_BTN_AUTH, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getRouterPathList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.ROUTER.GET_ROUTER_URL_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setRouterPath(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.ROUTER.SET_ROUTER_URL, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getCommonCodeList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.COMMON.GET_COMMON_CODE_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setCommonCodeList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.COMMON.SET_COMMON_CODE, param);
  console.log(params);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function removeCommonCodeList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.COMMON.REMOVE_COMMON_CODE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getLanguageLangList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.GET_LANGUAGE, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setLanguageLang(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.SET_LANGUAGE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function removeLanguageLang(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.REMOVE_LANGUAGE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setApi(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.SET_API, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getApi(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.API.GET_API, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function setMemo(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.API.SET_MEMO, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function removeMemo(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.API.REMOVE_MEMO, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getRouterUrlLanguageList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.GET_ROUTER_URL_LANGUAGE_LIST, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getListOfRouterUrlSetLang(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.GET_LIST_OF_ROUTER_URL_SET_LANG, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getLangFind(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.GET_LANG_FIND, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessfulResult(response));
}

function setRouterUrlLanguage(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.SET_ROUTER_URL_LANGUAGE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function removeRouterUrlLanguage(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ADMIN.LANGUAGE.REMOVE_ROUTER_URL_LANGUAGE, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

export default {
  getMenuList,
  getMenuDetail,
  getMenuButtonAuth,
  setMenu,
  setMenuDetail,
  setMenuBtnAuth,
  getRouterPathList,
  setRouterPath,
  getCommonCodeList,
  setCommonCodeList,
  removeCommonCodeList,
  getLanguageLangList,
  setLanguageLang,
  removeLanguageLang,
  setApi,
  getApi,
  setMemo,
  removeMemo,
  getRouterUrlLanguageList,
  getListOfRouterUrlSetLang,
  setRouterUrlLanguage,
  removeRouterUrlLanguage,
  getLangFind,
};
