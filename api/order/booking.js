import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

function getBookingList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.GET_BOOKING_LIST, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function offrBookingExcelDownload(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.EXCEL.OFFR_BOOKING_EXCEL_DOWNLOAD, param);
  return axios.post(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function saveBookingExcel(file) {
  const { httpUrl, params, headers } = responseUtil.setHttpUrlReplace(urls.ORDER.EXCEL.POST_BOOKING_UPLOAD, file, 'formData');
  return axios.post(httpUrl, params, headers).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function saveApprReq(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.SAVE_APPRREQ, param);
  return axios.put(httpUrl, params);
}

function saveBookingRemove(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.SAVE_BOOKING_REMOVE, param);
  return axios.put(httpUrl, params);
}

function saveBookingConfirm(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.SAVE_BOOKING_CONFIRM, param);
  console.log(param);
  return axios.put(httpUrl, params);
}

function saveBookingEnd(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.SAVE_BOOKING_DFCEND, param);
  return axios.put(httpUrl, params);
}

function saveBookingPrice(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.SAVE_BOOKING_SALE, param);
  return axios.put(httpUrl, params);
}

function saveBookingCancel(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.SAVE_BOOKING_CANCEL, param);
  console.log('saveBookingCancel params', params);
  return axios.put(httpUrl, params);
}

function saveBookingAssign(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.SAVE_BOOKING_ASSIGN, param);
  return axios.put(httpUrl, params);
}

function saveBookingChange(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.SAVE_BOOKING_CHANGE, param);
  return axios.put(httpUrl, params);
}

function saveBookingRequest(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.SAVE_BOOKING_REQUEST, param);
  return axios.put(httpUrl, params);
}

function saveBookingDelvry(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.SAVE_BOOKING_DELVRY, param);
  return axios.put(httpUrl, params);
}

function getBookingCredit(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.GET_BOOKING_CREDIT, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getBookingDebitPrint(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.GET_BOOKING_PRINT, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getBookingOffrPrint(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.GET_BOOKING_OFFRPRINT, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function savePlant(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.SOP.SAVE_PLANT, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function createSo(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.SOP.CREATE_SO, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getPlantQty(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.SOP.GET_PLANT_QTY, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveBookingAssignEnd(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.SOP.SAVE_BOOKING_ASSIGN_END, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function putBookingInquiry(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.PUT_BOOKING_INQUIRY, param);
  return axios.put(httpUrl, params);
}

function getDebitNote(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.PRINT_DEBIT_NOTE, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

export default {
  getBookingList,
  offrBookingExcelDownload,
  saveBookingExcel,
  saveApprReq,
  saveBookingRemove,
  saveBookingConfirm,
  saveBookingEnd,
  saveBookingPrice,
  saveBookingCancel,
  saveBookingAssign,
  saveBookingChange,
  saveBookingRequest,
  saveBookingDelvry,
  getBookingCredit,
  getBookingDebitPrint,
  getBookingOffrPrint,
  savePlant,
  createSo,
  getPlantQty,
  saveBookingAssignEnd,
  putBookingInquiry,
  getDebitNote,
};
