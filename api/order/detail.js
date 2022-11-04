import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

function getQuoteDetail(param) {
  // var param2 = {
  //   custId: '14',
  //   id: '96',
  // };
  // console.log('견적관리상세 조회: ', param);
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.GET_QUOTE_DETAIL, param);
  console.log('httpUrl : ' + httpUrl);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getOffrMng(param) {
  //견적관리 조회
  // console.log('견적관리조회: ', param);
  // var param2 = {
  //   custId: '14',
  //   id: '96',
  // };
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.GET_OFFR_MNG, param);
  // console.log('httpUrl: ', httpUrl);
  return axios.get(httpUrl);
}

function getTrnInfo(offrId) {
  //배송지 정보 조회
  var param = {
    offrId: offrId,
  };
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.GET_TRN_INFO, param);
  // console.log('httpUrl: ', httpUrl);
  return axios.get(httpUrl);
}

function putBokngConfirm(param) {
  //부킹확정
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.PUT_BOKNG_CONFIRM, param);
  return axios.put(httpUrl, params);
}

function putSampleEnd(param) {
  //샘플완료 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.PUT_SAMPLE_END, param);
  return axios.put(httpUrl, params);
}

function putSampleSave(param) {
  //샘플견적 저장
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.PUT_SAMPLE_APPR, param);
  return axios.put(httpUrl, params);
}

function getCostcenter(filterData) {
  //코스트센터 목록
  console.log('api');
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.GET_COSTCENTER, filterData);
  return axios.get(httpUrl);
}

function getSalesMemo(param) {
  //샘플메모 조회
  console.log('샘플메모 조회: ', param);
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.GET_SALES_MEMO, param);
  return axios.get(httpUrl);
}

function putApprReq(param) {
  //결재상신
  console.log('결재상신: ', param);
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.BOOKING.SAVE_APPRREQ, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function putSampleConfirm(param) {
  //샘플확정
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.ORDER.DETAIL.PUT_SAMPLE_CONFIRM, param);
  return axios.put(httpUrl, params);
}

export default {
  getQuoteDetail,
  getOffrMng,
  getTrnInfo,
  putBokngConfirm,
  putSampleEnd,
  getCostcenter,
  putSampleSave,
  getSalesMemo,
  putApprReq,
  putSampleConfirm,
};
