import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import _ from "lodash";
import moment from "moment";
import FunctionCustom from "./plugins/function";
import { VueMaskDirective } from "v-mask";
Vue.config.productionTip = false;
Vue.directive("mask", VueMaskDirective);
new Vue({
  moment,
  router,
  store,
  vuetify,
  _,
  FunctionCustom,
  render: (h) => h(App),
}).$mount("#app");

require("../node_modules/realgrid/dist/realgrid-style.css");
