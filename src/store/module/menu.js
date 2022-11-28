const menu = {
  namespaced: true,
  state: {
    menu: [],
  },
  mutations: {
    SET_MENU(state, value) {
      this.commit("menu/RESET_MENU");
      value = { memberid: "test@test.com" };
      getMenu(value)
        .then((res) => {
          if (res.status === 200) {
            const response = res.data;
            state.menu = response.data;
          }
        })
        .catch((err) => {
          console.err(err);
        })
        .finally();
    },
    RESET_MENU(state) {
      state.menu = {};
    },
  },
  getters: {},
  actions: {},
};
import { getMenu } from "api/menu";
export default menu;
