import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../views/Login"),
      meta: {
        requiresVisitor: true,
      },
    },
    {
      path: "/cadastro",
      name: "register",
      component: () => import("../views/Register"),
      meta: {
        requiresVisitor: true,
      },
    },
    {
      path: "/feed",
      name: "feed",
      component: () => import("../views/Feed"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/profile/:id",
      name: "Página pessoal",
      component: () => import("../views/Profile"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/editar",
      name: "edit",
      component: () => import("../views/Edit"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/budgets",
      name: "budgets",
      component: () => import("../views/Budgets"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/services",
      name: "services",
      component: () => import("../views/MyServices"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
