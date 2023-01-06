const common = {
  namespaced: true,
  state: {
    code: {},
  },
  mutations: {
    SET_CODE(state, value) {
      getCode(value)
        .then((res) => {
          const response = res.data;
          state.code[value] = _.reduce(
            response.data,
            (a, v) => {
              a.push(v.val);
              return a;
            },
            []
          );
          state.code[value].unshift("전체");
        })
        .catch(() => {});
    },
  },
  getters: {},
  actions: {},
};
import { getCode } from "api/common";
import _ from "lodash";
export default common;
