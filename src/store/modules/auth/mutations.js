/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import Vue from "vue";
import * as types from "./mutation-types";

/* eslint-disable no-param-reassign */
export default {
  [types.CHECK](state) {
    state.authenticated = !!localStorage.getItem("access_token");
    if (state.authenticated) {
      Vue.$http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
    }
  },

  [types.REGISTER](state) {
    // register
  },

  [types.LOGIN](state, identification) {
    // state.authenticated = true;
    state.identification = identification;
  },

  [types.VERIFY](state, access_token) {
    // verify
    localStorage.setItem("access_token", access_token);
    Vue.$http.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    state.authenticated = true;
  },

  [types.LOGOUT](state) {
    state.authenticated = false;
    localStorage.removeItem("access_token");
    Vue.$http.defaults.headers.common.Authorization = "";
  }
};
