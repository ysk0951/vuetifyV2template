import Vue from "vue";
import store from "../store";
export const FunctionCustom = {
  install(Vue, optoins) {
    Vue.staticMethod = () => {};
    Vue.prototype.getText = (code) => {
      const message = optoins.store.state.locale.message;
      return message.reduce((acc, cur) => {
        if (cur.code === code) {
          acc += cur.message;
        }
        return acc;
      }, "");
    };
  },
};
Vue.use(FunctionCustom, { store });
