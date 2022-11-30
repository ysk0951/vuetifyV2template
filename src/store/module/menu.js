const menu = {
  namespaced: true,
  state: {
    menu: [],
  },
  mutations: {
    SET_MENU(state, value) {
      this.commit("menu/RESET_MENU");
      value = { Authorization: this.state.member.accessToken };
      console.log(value);
      getMenu(value)
        .then((res) => {
          if (res.status === 200) {
            const response = res.data;
            const menu = _.filter(response.data, (v) => {
              if (v.subMenu.length > 0) {
                return v;
              }
            });
            console.log(menu);
            state.menu = menu;
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
import _ from "lodash";
import { getMenu } from "api/menu";
export default menu;
