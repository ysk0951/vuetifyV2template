import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import ModifyPwd from "../views/member/ModifyPwd";
import Find from "../views/member/Find";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Login,
  },
  {
    path: "/member/modifyPwd",
    name: "modifyPwd",
    component: ModifyPwd,
  },
  {
    path: "/member/find",
    name: "find",
    component: Find,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
