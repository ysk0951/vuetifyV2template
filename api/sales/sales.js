import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

function getItemBasePriceList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.SALES.ITEM.GET_ITEM_BASE_PRICE_LIST, param);
  return axios.get(httpUrl);
}

function getItemBasePriceInfo(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.SALES.ITEM.GET_ITEM_BASE_PRICE_INFO, param);
  return axios.get(httpUrl);
}

function getClientItemPriceList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.SALES.CLIENT_ITEM.GET_CLIENT_ITEM_PRICE_LIST, param);
  return axios.get(httpUrl);
}

function getClientItemPriceInfo(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.SALES.CLIENT_ITEM.GET_CLIENT_ITEM_PRICE_INFO, param);
  return axios.get(httpUrl);
}

function excelUploadItem(file) {
  const { httpUrl, params, headers } = responseUtil.setHttpUrlReplace(urls.SALES.EXCEL.ITEM_EXCEL_UPLOAD, file, 'formData');
  return axios.post(httpUrl, params, headers).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function excelUploadClient(file) {
  const { httpUrl, params, headers } = responseUtil.setHttpUrlReplace(urls.SALES.EXCEL.CLIENT_EXCEL_UPLOAD, file, 'formData');
  return axios.post(httpUrl, params, headers).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function excelDownloadClient(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.SALES.EXCEL.CLIENT_EXCEL_DOWNLOAD, param);
  return axios.get(httpUrl, { responseType: 'blob', responseFileNm: param.fileNm });
}

function saveItemApprDocNum(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.SALES.ITEM.SAVE_ITEM_APPR_DOC_NUM, param);
  return axios.put(httpUrl, params);
}

function saveClientItemApprDocNum(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.SALES.CLIENT_ITEM.SAVE_CLIENT_ITEM_APPR_DOC_NUM, param);
  return axios.put(httpUrl, params);
}

export default {
  getItemBasePriceList,
  getItemBasePriceInfo,
  getClientItemPriceList,
  getClientItemPriceInfo,
  excelUploadItem,
  excelUploadClient,
  excelDownloadClient,
  saveItemApprDocNum,
  saveClientItemApprDocNum,
};
