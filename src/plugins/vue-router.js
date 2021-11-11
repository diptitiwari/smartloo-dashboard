import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/routes";
import store from "@/store";

Vue.use(VueRouter);

export const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  if (to.path.indexOf("login") >= 0 || (from.path.indexOf("login") >= 0 && to.path.indexOf("verify") >= 0)) {
    store.dispatch("page/loginStep", true);
    store.dispatch("site/isSiteInfo", false);
  } else {
    store.dispatch("page/loginStep", false);
    store.dispatch("site/isSiteInfo", false);
  }

  if (to.matched.some(m => m.meta.auth) && !store.state.auth.authenticated) {
    /*
     * If the user is not authenticated and visits
     * a page that requires authentication, redirect to the login page
     */
    next({
      name: "login.index"
    });
  } else if (to.matched.some(m => m.meta.guest) && store.state.auth.authenticated) {
    /*
     * If the user is authenticated and visits
     * an guest page, redirect to the dashboard page
     */
    next({
      name: "home.index"
    });
  } else {
    next();
  }
});

Vue.router = router;

export default {
  router
};
