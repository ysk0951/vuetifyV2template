import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

function getCustDefault(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.JOIN.JOIN_CUST.GET_CUSTOMER_DEFAULT, param);
  return axios.get(httpUrl, params);
}

// 운송사 기본 정보 조회
function getTransDefault(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.JOIN.JOIN_TRANS.GET_TRANS_DEFAULT, param);
  return axios.get(httpUrl, params);
}

// 고객 주소 저장
function setCustAddr(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.JOIN.JOIN_CUST.SET_CUSTOMER_ADDR, param);
  return axios.put(httpUrl, params);
}

// 고객사대표자 저장
function setCustDefault(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.JOIN.JOIN_CUST.SET_CUSTOMER_DEFAULT, param);
  return axios.put(httpUrl, params);
}

// 운송사대표자 저장
function setTransDefault(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.JOIN.JOIN_TRANS.SET_TRANS_DEFAULT, param);
  return axios.put(httpUrl, params);
}

// 운송사 주소 저장
function setTransAddr(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.JOIN.JOIN_TRANS.SET_TRANS_ADDR, param);
  return axios.put(httpUrl, params);
}

function getCustArea() {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.JOIN.JOIN_CUST.GET_CUSTOMER_AREA);
  return axios.get(httpUrl);
}

function getCustAreaDetail(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.JOIN.JOIN_CUST.GET_CUSTOMER_AREA_DTAIL, param);
  return axios.get(httpUrl, params);
}

function postCustTempPwd(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.JOIN.JOIN_CUST.POST_CUSTOMER_TEMPPWD, param);
  return axios.post(httpUrl, params);
}

export default {
  getCustDefault,
  setCustDefault,
  setCustAddr,
  getCustAreaDetail,
  getCustArea,
  postCustTempPwd,
  getTransDefault,
  setTransDefault,
  setTransAddr,
};
