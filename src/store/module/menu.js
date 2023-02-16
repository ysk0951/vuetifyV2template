const menu = {
  namespaced: true,
  state: {
    menu: [],
    allMenu: [],
    selectMenu: [],
    tab: 0,
  },
  mutations: {
    SELECT_MENU(state, value) {
      const isExist =
        _.filter(state.selectMenu, (v) => v.code === value.code).length > 0;
      if (!isExist) {
        state.selectMenu.push(value);
      }
      state.tab = _.findIndex(state.selectMenu, (v) => v.code === value.code);
    },
    ADD_MENU_TAB(state, value) {
      state.selectMenu.push(value);
    },
    RESET_SELECT_MENU(state) {
      state.selectMenu = [];
      state.tab = 0;
    },
    SET_SELECT_MENU_TAB(state, value) {
      state.tab = value;
    },
    SET_SELECT_MENU_TAB_BY_CODE(state, value) {
      const idx = _.findIndex(state.selectMenu, (v) => v.code === value);
      if (idx > -1) {
        state.tab = idx;
      }
    },
    REMOVE_SELECT_MENU(state, value) {
      state.selectMenu = _.filter(state.selectMenu, (v) => v.code !== value);
    },
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
            // state.allMenu = response.data;
            state.allMenu = _.filter(response.data, (v) => {
              return v.subMenu.length > 0;
            });
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
  actions: {},
};
import _ from "lodash";
import { getMenu, getAllMenu } from "api/menu";
export default menu;
