const member = {
  namespaced: true,
  state: {
    locale: "ko",
    message: {},
  },
  mutations: {
    SET_LOCALE(state, value) {
      state.locale = value;
      console.log(value, state.locale);
      const token = this.state.member.accessToken;

      getMessage({
        locale: value,
        route: _.isEmpty(token) ? "/login" : location.pathname,
      })
        .then((res) => {
          const body = res.data;
          if (!_.isEmpty(body)) {
            this.commit("locale/SET_MESSAGE", body.data);
          }
        })
        .catch((res) => {
          console.error(res);
          this.commit("locale/SET_MESSAGE", []);
        });
    },
    SET_MESSAGE(state, value) {
      this.commit("locale/RESET_MESSAGE");
      state.message = value;
    },
    RESET_LOCALE(state) {
      state.locale = "ko";
    },
    RESET_MESSAGE(state) {
      state.message = {};
    },
  },
  getters: {},
  actions: {},
};

import { getMessage } from "api/language";
import _ from "lodash";
export default member;
