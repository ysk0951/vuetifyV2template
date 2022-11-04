import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

function getProductCode() {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT.GET_PRODUCT_CODE);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function searchProductCode(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT.SEARCH_PRODUCT_CODE, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getProductFavorite(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT.GET_PRODUCT_FAVORITE, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function saveProductFavorite(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT.SAVE_PRODUCT_FAVORIET, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function searchProductSize(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT.SEARCH_PRODUCT_SIZE, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function searchProductTsk(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT.SEARCH_PRODUCT_TSK, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getProductPrevious(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT.GET_PRODUCT_PRE, param);
  return axios.get(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}
// 견적 관리/상세
function getProductManageList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT_MANAGEMENT.GET_PRODUCT_MANAGE_LIST, param);
  return axios.get(httpUrl, params);
}
function getSearchResult(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT_MANAGEMENT.GET_SEARCH_RESULT, param);
  return axios.get(httpUrl, params);
}

function saveCopyRegist(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT_MANAGEMENT.SAVE_COPY_PRODUCT, param);
  return axios.put(httpUrl, params);
}

function saveCancelProduct(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT_MANAGEMENT.SAVE_CANCEL_PRODUCT, param);
  return axios.put(httpUrl, params);
}

function saveDeleteProductSelection(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT_MANAGEMENT.SAVE_DELETE_PRODUCT_SELECTION, param);
  return axios.put(httpUrl, params);
}

function getPrintQuotation(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT_MANAGEMENT.GET_PRINT_QUOTATION, param);
  return axios.get(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getPrintContratct(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT_MANAGEMENT.GET_PRINT_CONTRACT, param);
  return axios.get(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function cancelSample(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.SAMPLE_MANAGEMENT.SAVE_CANCEL_SAMPLE, param);
  return axios.put(httpUrl, params);
}

function confirmQuote(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT_MANAGEMENT.PUT_CONFIRM_QUOTE, param);
  return axios.put(httpUrl, params);
}

function submitApproval(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT_MANAGEMENT.PUT_SUBMIT_APPROVAL, param);
  return axios.put(httpUrl, params);
}

function sendQuotation(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT_MANAGEMENT.PUT_SEND_QUOTATION, param);
  return axios.put(httpUrl, params);
}

function putSalesMemo(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.PRODUCT_MANAGEMENT.PUT_SALES_MEMO, param);
  return axios.put(httpUrl, params);
}

export default {
  putSalesMemo,
  sendQuotation,
  submitApproval,
  confirmQuote,
  cancelSample,
  getProductCode,
  searchProductCode,
  searchProductSize,
  searchProductTsk,
  getProductFavorite,
  saveProductFavorite,
  getProductPrevious,
  saveCopyRegist,
  getPrintQuotation,
  getPrintContratct,
  getSearchResult,
  //견적관리 상세
  getProductManageList,
  saveCancelProduct,
  saveDeleteProductSelection,
};
