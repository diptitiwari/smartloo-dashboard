/* ============
 * Main File
 * ============
 *
 * Will initialize the application.
 */

import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

/* ============
 * Plugins
 * ============
 *
 * Import and bootstrap the plugins.
 */

import "./plugins/vuex";
import "./plugins/axios";
import "./plugins/bootstrap-vue";
import { router } from "./plugins/vue-router";
// import './plugins/vuex-router-sync';
import "./plugins/bootstrap";
import "./plugins/jqwidgets";
import "./plugins/font-awesome";
import "./plugins/register-service-worker";
import "./plugins/other-plugins";
import "./plugins/vue-js-modal";
import "./plugins/vee-validate";
import "./plugins/vue-notification";
import "./assets/stylus/app.styl";
import "./assets/css/dark.css";

import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

store.dispatch("auth/check");
store.dispatch("page/check");

Vue.use(VueSweetalert2);

/* eslint-disable no-new */
new Vue({
  /**
  * Bind the Vue instance to the HTML.
  */
  el: "#app",

  /**
  * The router.
  */
  router,

  /**
  * The Vuex store.
  */
  store,
  /**
  * Will render the application.
  *
  * @param {Function} h Will create an element.
  */
  render: h => h(App)
});
