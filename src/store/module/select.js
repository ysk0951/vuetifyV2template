const select = {
  namespaced: true,
  state: {
    workType: [
      {
        key: 0,
        text: "전체",
      },
      {
        key: 1,
        text: "재직중",
      },
      {
        key: 2,
        text: "퇴사",
      },
    ],
    roleType: [],
  },
  mutations: {
    SET_ROLE_TYPE(state) {
      let result = [];
      getRoleList()
        .then((res) => {
          const response = res.data;
          if (!_.isEmpty(response)) {
            console.log(response.data);
            _.forEach(response.data, function (v, idx) {
              result.push({
                key: idx,
                text: v.roleName,
              });
            });
          }
        })
        .catch()
        .finally();
      state.roleType = result;
    },
  },
  getters: {},
  actions: {},
};
import _ from "lodash";
import { getRoleList } from "api/member/member";
export default select;
