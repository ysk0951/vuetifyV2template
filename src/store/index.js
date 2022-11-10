import Vue from "vue";
import Vuex from "vuex";
import member from "./module/member";
import modal from "./module/modal";
import loading from "./module/loading";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    member,
    modal,
    loading,
  },
  plugins: [
    createPersistedState({
      paths: member,
    }),
  ],
});
