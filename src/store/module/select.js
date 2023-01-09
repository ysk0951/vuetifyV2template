const select = {
  namespaced: true,
  state: {
    workType: ["전체", "재직중", "퇴사"],
    roleType: [],
    roleSet: [],
    menuMgn: [],
  },
  mutations: {
    SET_ROLE_TYPE(state) {
      let result = [];
      getRoleList()
        .then((res) => {
          const response = res.data;
          if (!_.isEmpty(response)) {
            result.push("전체");
            _.forEach(response.data, function (v) {
              result.push(v.roleName);
            });
          }
          state.roleType = result;
          state.roleSet = response.data;
          result.shift();
          state.menuMgn = result;
        })
        .catch()
        .finally();
    },
  },
  getters: {},
  actions: {},
};
import _ from "lodash";
import { getRoleList } from "api/member/member";
export default select;
