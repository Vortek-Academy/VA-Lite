import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/commands",
    name: "Commands",
    component: () => import("../views/Commands.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard"),
  },
  {
    path: "/dashboard/guild/:id",
    name: "GDash",
    component: () => import("../views/Guild"),
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: () => import("../views/Privacy"),
  },
  {
    path: "/terms",
    name: "Terms",
    component: () => import("../views/Terms"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
