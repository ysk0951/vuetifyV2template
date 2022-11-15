const member = {
  namespaced: true,
  state: {
    locale: "ko",
    message: {},
  },
  mutations: {
    SET_LOCALE(state, value) {
      state.locale = value;
      getMessage({
        locale: value,
        route: location.pathname,
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
      this.commit("locale/RESET_LOCALE");
      state.message = value;
    },
    RESET_LOCALE(state) {
      state.message = {};
      state.locale = "ko";
    },
  },
  getters: {},
  actions: {},
};

import { getMessage } from "api/language";
import { _ } from "core-js";
export default member;
