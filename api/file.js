import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

function upload(file) {
  //   console.log(typeof file);
  //   const param = { file };
  const { httpUrl, params, headers } = responseUtil.setHttpUrlReplace(urls.COMMON.FILE.UPLOAD, file, 'formData');
  return axios.post(httpUrl, params, headers).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function download(savePath, fileNm) {
  const param = {
    savePath,
    fileNm,
  };
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.COMMON.FILE.DOWNLOAD, param);
  return axios.get(httpUrl, { params, responseType: 'blob', responseFileNm: fileNm });
}

export default {
  upload,
  download,
};
