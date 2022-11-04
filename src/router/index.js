import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import ModifyPwd from "../views/member/ModifyPwd";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/modifyPwd",
    name: "modifyPwd",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ModifyPwd,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
