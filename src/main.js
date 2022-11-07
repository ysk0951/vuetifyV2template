import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import _ from "lodash";

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  _,
  render: (h) => h(App),
}).$mount("#app");
