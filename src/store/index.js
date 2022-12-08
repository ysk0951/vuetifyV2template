import Vue from "vue";
import Vuex from "vuex";
import member from "./module/member";
import modal from "./module/modal";
import loading from "./module/loading";
import popup from "./module/popup";
import locale from "./module/locale";
import menu from "./module/menu";
import select from "./module/select";
import common from "./module/common";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    member,
    modal,
    loading,
    popup,
    locale,
    menu,
    select,
    common,
  },
  plugins: [
    createPersistedState({
      paths: member,
    }),
  ],
});
