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
import Master from "@/views/master/Master";
import Document from "@/views/document/document";
import NoneMember from "@/views/NoneMember";
import Service from "@/views/Service";
import store from "@/store/index";
import _ from "lodash";
Vue.use(VueRouter);

const routes = [
  // SampleCode
  // {
  //   path: "/",
  //   name: "main",
  //   component: Main,
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
const path = defaultPath.concat(adminPath);
const dev = true;
router.beforeEach((to, from, next) => {
  //TODO :: 각 페이지별 메세지 로딩
  store.commit("locale/SET_NEWPATH_MESSAGE", to.path);
  store.commit("menu/RESET_SELECT_MENU");
  if (!dev) {
    if (path.includes(to.path)) {
      next();
    } else if (_.isEmpty(store.state.member.accessToken)) {
      router.push({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
  // });
});

//NavigationDuplicated Error ignore
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  if (location) {
    return originPush.call(this, location).catch((err) => {
      if (err.name !== "NavigationDuplicated") throw err;
    });
  }
};

export default router;
