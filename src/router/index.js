import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login"
import Register from "../views/Register"
import ForgotPassword from "../views/ForgotPassword"
import ResetPassword from "../views/ResetPassword"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/forgotPassword",
    name: "forgotPassword",
    component: ForgotPassword
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: ResetPassword
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
