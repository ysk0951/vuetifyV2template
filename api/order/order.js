import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

function getUserOfferInfo(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.CUSTOMER.GET_USER_OFFER_INFO, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveUserLogitsBaseAddr(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.CUSTOMER.SAVE_USER_LOGITS_BASE_ADDR, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveOffer(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.CUSTOMER.SAVE_OFFER, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveUserOfferExcel(file) {
  const { httpUrl, params, headers } = responseUtil.setHttpUrlReplace(urls.ORDER.CUSTOMER.SAVE_USER_OFFER_EXCEL, file, 'formData');
  return axios.post(httpUrl, params, headers).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getUserLogits(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.CUSTOMER.GET_USER_LOGITS, param);
  return axios.get(httpUrl);
}

function getOfferDetail(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.CUSTOMER.GET_OFFER_DETAIL, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function custSearch(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.SALES.GET_CUSTOMER_SEARCH, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getQuoteManageList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT_MANAGEMENT.GET_PRODUCT_MANAGE_LIST, param);
  return axios.get(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function quoteDelete(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT_MANAGEMENT.SAVE_DELETE_PRODUCT_SELECTION, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function putQuoteCancel(param) {
  //견적취소
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.PUT_QUOTE_CANCEL, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function putCancelCheck(param) {
  //견적취소 여부 확인
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.PUT_IS_CANCEL, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function putRmdCancel(param) {
  //남은량취소
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.PUT_RMD_CANCEL, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function putOffrCopy(param) {
  //복사등록
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT_MANAGEMENT.SAVE_COPY_PRODUCT, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function confirmQuote(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT_MANAGEMENT.PUT_CONFIRM_QUOTE, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getOffrMemo(param) {
  //메모
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.GET_OFFR_MEMO, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function postQuoteExcel(param, fileNm) {
  //엑셀다운로드
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.POST_QUOTE_EXCEL, param);
  return axios.post(httpUrl, params, {
    responseType: 'blob',
    responseFileNm: fileNm,
  });
}

function putOffrChgSave(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.PUT_OFFR_CHG_SAVE, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function saveBookingExcel(file) {
  const { httpUrl, params, headers } = responseUtil.setHttpUrlReplace(urls.ORDER.EXCEL.SAVE_BOOKING_EXCEL, file, 'formData');
  return axios.post(httpUrl, params, headers).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function putSaveUi(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.PUT_SAVE_UI, param);
  return axios.put(httpUrl, params);
}

function putSalesMemo(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT_MANAGEMENT.PUT_SALES_MEMO, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

export default {
  getUserOfferInfo,
  saveUserLogitsBaseAddr,
  saveOffer,
  saveUserOfferExcel,
  getUserLogits,
  getOfferDetail,
  custSearch,
  getQuoteManageList,
  quoteDelete,
  putQuoteCancel,
  putRmdCancel,
  putSaveUi,
  putOffrCopy,
  confirmQuote,
  getOffrMemo,
  postQuoteExcel,
  putOffrChgSave,
  saveBookingExcel,
  putCancelCheck,
  putSalesMemo,
};
