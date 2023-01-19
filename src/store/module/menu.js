const menu = {
  namespaced: true,
  state: {
    menu: [],
    allMenu: [],
  },
  mutations: {
    SET_MENU(state) {
      this.commit("menu/RESET_MENU");
      getMenu()
        .then((res) => {
          if (res.status === 200) {
            const response = res.data;
            const menu = _.filter(response.data, (v) => {
              if (v.subMenu.length > 0) {
                return v;
              }
            });
            state.menu = menu;
            console.log(state.menu);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally();
    },
    SET_ALL_MENU(state) {
      getAllMenu()
        .then((res) => {
          if (res.status === 200) {
            const response = res.data;
            state.allMenu = response.data;
          }
        })
        .catch((err) => {
          console.error(err);
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
import { getMenu, getAllMenu } from "api/menu";
export default menu;
