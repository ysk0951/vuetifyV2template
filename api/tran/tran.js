import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

//예탁출고요청관리
function getdepFwReqManageList(param) {
  //예탁출고요청 목록 조회
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.DEPOSIT_MANAGE.GET_DEPOSIT_MANAGE_LIST, param);
  return axios.get(httpUrl);
}
function putdepFwReqSave(param) {
  //예탁출고요청 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.DEPOSIT_MANAGE.PUT_EXPT_CONFIRM, param);
  return axios.put(httpUrl, params);
}
function putdepFwReqCancle(param) {
  //예탁출고요청취소 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.DEPOSIT_MANAGE.PUT_EXPT_REQUEST_CANCEL, param);
  return axios.put(httpUrl, params);
}

//차량관리
function getCarManageList(param) {
  //차량관리 목록 조회
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.CAR_MANAGE.GET_CAR_MANAGE_LIST, param);
  return axios.get(httpUrl);
}
function putCarManageSave(param) {
  //차량관리 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.CAR_MANAGE.PUT_CAR_MANAGE_SAVE, param);
  return axios.put(httpUrl, params);
}
function putCarMangDelete(param) {
  //차량관리 삭제 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.CAR_MANAGE.PUT_CAR_MANG_DELETE, param);
  return axios.put(httpUrl, params);
}

//PO출고요청관리
function getPoRequstList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.TRAN.POFWARD_REQUEST.GET_POREQUEST_LIST, param);
  return axios.get(httpUrl);
}

function savePoConfirm(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.POFWARD_REQUEST.SAVE_POREQUEST, param);
  return axios.put(httpUrl, params);
}

function saveExptConfirm(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.TRAN.POFWARD_REQUEST.SAVE_POREQUEST_BATCH, param);
  return axios.put(httpUrl, params);
}

export default {
  getdepFwReqManageList,
  putdepFwReqSave,
  putdepFwReqCancle,
  getCarManageList,
  putCarManageSave,
  putCarMangDelete,
  getPoRequstList,
  savePoConfirm,
  saveExptConfirm,
};
