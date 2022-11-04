import axios from '../plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';
import defs from '@/consts/defs';

function getRouterLanguage(routerPath, menuId, language, gridYn = 'N') {
  const param = {
    routerPath,
    menuId,
    gridYn,
  };
  let url = urls.COMMON.ROUTER_LANGUAGE;

  defs.v2RouterPath.forEach(path => {
    if (path === routerPath) {
      url = url.replace('v1', 'v2');
    }
  });
  const { httpUrl } = responseUtil.setHttpUrlReplace(url, param);
  return axios.get(httpUrl, { headers: { language } });
}

export default {
  getRouterLanguage,
};
