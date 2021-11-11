/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import * as types from "./mutation-types";
import initialState from "./state";

/* eslint-disable no-param-reassign */
export default {
  [types.CHECK](state) {
    const account = localStorage.getItem("account")
      ? JSON.parse(localStorage.getItem("account"))
      : initialState;
    state.accessible_tenants = account.accessible_tenants;
    state.email = account.email;
    state.id = account.id;
    state.mobile_number = account.mobile_number;
    state.name = account.name;
    state.role_names = account.role_names;
  },

  [types.SET](state, account) {
    localStorage.setItem("account", JSON.stringify(account));
    state.accessible_tenants = account.accessible_tenants;
    state.email = account.email;
    state.id = account.id;
    state.mobile_number = account.mobile_number;
    state.name = account.name;
    state.role_names = account.role_names;
  },

  [types.UPDATE](state, account) {
    // state.email = account.email;
    // state.firstName = account.firstName;
    // state.lastName = account.lastName;
    localStorage.setItem("account", JSON.stringify(state));
  },

  [types.REMOVE](state) {
    state.accessible_tenants = initialState.accessible_tenants;
    state.email = initialState.email;
    state.id = initialState.id;
    state.mobile_number = initialState.mobile_number;
    state.name = initialState.name;
    state.role_names = initialState.role_names;
    localStorage.removeItem("account");
  }
};
