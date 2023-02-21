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
      const beforeIdx = _.findIndex(state.selectMenu, (v) => v.code === value);
      const length = state.selectMenu.length - 1;
      state.selectMenu = _.filter(state.selectMenu, (v) => v.code !== value);
      setTimeout(() => {
        //맨앞걸 지울때는 댕김
        if (beforeIdx == 0) {
          state.tab = beforeIdx;
          //맨끝걸 지우면 하나 당김
        } else if (beforeIdx == length) {
          state.tab = beforeIdx - 1;
        } else {
          //중간거는 그대로
          state.tab = beforeIdx;
        }
      }, 100);

      console.log(beforeIdx, length);
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
