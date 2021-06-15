import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AttendanceHistory from "../components/AttendanceHistory.vue";
import Jobs from "../components/Jobs.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [

  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: Jobs
  },
  {
    path: "/attendancehistory",
    name: "AttendanceHistory",
    component: AttendanceHistory
  },
  {
    path: "/",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
