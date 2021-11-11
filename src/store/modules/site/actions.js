/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import * as types from "./mutation-types";

export const info = ({ commit }, payload) => {
  commit(types.INFO, payload);
};

export const summary = ({ commit }, payload) => {
  commit(types.SUMMARY, payload);
};

export const isSiteInfo = ({ commit }, payload) => {
  commit(types.IS_SITE_INFO, payload);
};

export const setIOT = ({ commit }, payload) => {
  commit(types.IOT, payload);
};

export default {
  info,
  summary,
  isSiteInfo,
  setIOT
};
