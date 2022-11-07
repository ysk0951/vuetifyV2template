import Vue from "vue";
import Vuex from "vuex";
import member from "./module/member";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    member,
  },
});
