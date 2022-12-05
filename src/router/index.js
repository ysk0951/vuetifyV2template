import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import ModifyPwd from "@/views/member/ModifyPwd";
import Find from "@/views/member/Find";
import Main from "@/views/Main";
import Signup from "@/views/member/Signup";
import SignupDone from "@/views/member/SignupDone";
import Admin from "@/views/admin/Admin";
import AddGroup from "@/views/admin/user/AddGroup";
import NotFoundPage from "@/views/NotFoundPage";
import Sample from "@/views/sample/Sample";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/modifyPwd",
    name: "modifyPwd",
    component: ModifyPwd,
  },
  {
    path: "/find",
    name: "find",
    component: Find,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/signupDone",
    name: "signupDone",
    component: SignupDone,
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
  },
  {
    path: "/admin/addGroup",
    name: "addGroup",
    component: AddGroup,
  },
  {
    path: "/sample",
    name: "sample",
    component: Sample,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

//NavigationDuplicated Error ignore
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch((err) => {
    if (err.name !== "NavigationDuplicated") throw err;
  });
};

export default router;
