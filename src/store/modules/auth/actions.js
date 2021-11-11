/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import Vue from "vue";
import store from "@/store";
import * as types from "./mutation-types";

export const check = ({ commit }) => {
  commit(types.CHECK);
};

export const register = ({ commit }, user) => {
  /*
   * Normally you would use a proxy to register the user:
   *
   * new Proxy()
   *  .register(payload)
   *  .then((response) => {
   *    commit(types.REGISTER, response);
   *  })
   *  .catch(() => {
   *    console.log('Request failed...');
   *  });
   */
  // return Vue.$http
  //   .post('/api/session', user)
  //   .then((response) => {
  //     const user = response.data
  //     commit('SET_CURRENT_USER', user)
  //     commit(types.REGISTER, response);
  //     return user
  //   });
  Vue.router.push({
    name: "verify.index"
  });
  // commit(types.LOGIN, 'RandomGeneratedToken');
  // Vue.router.push({
  //   name: 'home.index',
  // });
};

export const login = ({ commit }, identification) => {
  // store.dispatch('account/set');
  commit(types.LOGIN, identification);
  Vue.router.push({
    name: "verify.index"
  });
};

export const verify = ({ commit }, data) => {
  /* console.log('this is data', data);
  if (!store.state.page.loginStep) {
    Vue.router.push({
      name: 'thankyou.index',
    });
  } else { */
  store.dispatch("account/set", data.user);
  commit(types.VERIFY, data.access_token);
  Vue.router.push({
    name: "home.index"
  });
  // }
};

export const logout = ({ commit }) => {
  store.dispatch("account/remove");
  commit(types.LOGOUT);
  Vue.router.push({
    name: "login.index"
  });
};

export default {
  check,
  register,
  login,
  verify,
  logout
};
