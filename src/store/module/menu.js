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
      console.log("tab", value);
      state.selectMenu.push(value);
    },
    ADD_MENU_TAB_BY_CODE(state, value) {
      const allSubMenu = _.reduce(
        state.allMenu,
        (a, v) => {
          a = a.concat(v.subMenu);
          return a;
        },
        []
      );
      const addMenu = _.filter(allSubMenu, (v) => v.code === value);
      state.selectMenu = state.selectMenu.concat(addMenu);
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
      const beforeIdx = _.findIndex(state.selectMenu, (v) => v.code === value);
      const beforeTab = state.tab;
      const length = state.selectMenu.length - 1;
      //remove Action
      state.selectMenu = _.filter(state.selectMenu, (v) => v.code !== value);

      //tab Calculate
      setTimeout(() => {
        //선택된 탭을 지울때
        if (beforeIdx == beforeTab) {
          if (beforeIdx == length) {
            state.tab = beforeIdx - 1;
          } else {
            state.tab = beforeTab + 1;
            setTimeout(() => {
              state.tab = beforeTab;
            }, 100);
          }
        } else if (beforeIdx < beforeTab) {
          state.tab = beforeTab - 1;
        } else {
          state.tab = beforeTab;
        }
      }, 100);
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
import { setTimeout } from "core-js";
export default menu;
