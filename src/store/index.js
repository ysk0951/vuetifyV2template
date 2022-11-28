import Vue from "vue";
import Vuex from "vuex";
import member from "./module/member";
import modal from "./module/modal";
import loading from "./module/loading";
import popup from "./module/popup";
import locale from "./module/locale";
import menu from "./module/menu";
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
  },
  plugins: [
    createPersistedState({
      paths: member,
    }),
  ],
});
