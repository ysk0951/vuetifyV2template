import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

function login(id, password) {
  const param = {
    userCd: id,
    userPs: password,
  };
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.LOGIN, param);

  return axios.post(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function getUserMenu() {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.COMMON.MENU_LIST);

  return axios.get(httpUrl);
}

function tempPwd(pwd) {
  console.log('new: ', pwd);
  const param = {
    newPassWord: pwd,
  };
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.LOGIN.PUT_TEMP_PWD, param);
  console.log('pa: ', params);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function changePwd(nowPwd, newPwd) {
  const param = {
    nowPassWord: nowPwd,
    newPassWord: newPwd,
  };
  console.log('param: ', param);
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.LOGIN.PUT_CHANGE_PWD, param);
  return axios.put(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function nextChange() {
  const httpUrl = urls.LOGIN.PUT_CHANGE_NEXT;
  return axios.put(httpUrl).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function idSearch(param) {
  console.log('idSearch');
  console.log('param: ', param);
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.FIND.POST_FIND_ID, param);
  return axios.post(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

function pwSearch(param) {
  console.log('pwSearch');
  console.log('param: ', param);
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.FIND.POST_FIND_PW, param);
  return axios.post(httpUrl, params).then(response => responseUtil.rejectIfNotSuccessful(response));
}

export default {
  login,
  getUserMenu,
  tempPwd,
  changePwd,
  nextChange,
  idSearch,
  pwSearch,
};
