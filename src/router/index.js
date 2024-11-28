import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Toolbar",

    component: () => import("../views/Toolbar.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "/login",
        name: "login",
        component: () => import("../views/LoginView.vue"),
      },
      {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
      }
    ],
  },
  {
    path: "/workshop1",
    name: "workshop1",
    component: () => import("../views/Workshop1.vue"),
  },
  {
    path: "/workshop2",
    name: "workshop2",
    component: () => import("../views/Workshop2.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test.vue"),
  },
  {
    path: "/workshop3",
    name: "workshop3",
    component: () => import("../views/Workshop3.vue"),
  },
  {
    path: "/apicon",
    name: "apicon",
    component: () => import("../views/Apicon.vue"),
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("../views/Orders.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
