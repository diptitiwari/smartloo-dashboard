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
  [types.INFO](state, payload) {
    state.info = payload;
  },
  [types.SUMMARY](state, payload) {
    state.summary = payload;
  },
  [types.IS_SITE_INFO](state, payload) {
    state.isSiteInfo = payload;
  },
  [types.IOT](state, payload) {
    state.iot = payload;
  }
};
