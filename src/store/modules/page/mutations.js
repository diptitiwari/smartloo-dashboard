/* ============
 * Mutations for the page module
 * ============
 *
 * The mutations that are available on the
 * page module.
 */

import * as types from "./mutation-types";

/* eslint-disable no-param-reassign */
export default {
  [types.CHECK](state) {
    state.loginStep = !!localStorage.getItem("loginStep");
  },

  [types.LOGINSTEP](state, step) {
    localStorage.setItem("loginStep", step);
    state.loginStep = step;
  }
};
