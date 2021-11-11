/* ============
 * Actions for the page module
 * ============
 *
 * The actions that are available on the
 * account module.
 */

import * as types from "./mutation-types";

export const check = ({ commit }) => {
  commit(types.CHECK);
};


export const loginStep = ({ commit }, login) => {
  commit(types.LOGINSTEP, login);
};

export default {
  check,
  loginStep
};
