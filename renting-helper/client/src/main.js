import Vue from "vue";
import App from "./App.vue";
import router from "./routes/index";
import store from "./store";

router.beforeEach((to, from, next) => {

  store.commit("updateParams", to.params)
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({name: 'login'})
      store.commit("updateMessage", {
        type: "warning",
        data: "Você precisa estar logado para acessar essa área!"
      })
    } else {
      store.dispatch("currentUser")
        .then(next())
    }
  } if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({name: 'feed'})
    } else {
      next()
    }
  } else {
    next()
  }
})

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");