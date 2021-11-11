/* ============
 * Actions for the account module
 * ============
 *
 * The actions that are available on the
 * account module.
 */

import Vue from "vue";
// import Transformer from '@/transformers/AccountTransformer';
import * as types from "./mutation-types";

const defaultAccount = {
  first_name: "John",
  last_name: "Doe",
  email: "jonh@doe.com",
  phone: "123456789",
  accountType: "admin"
};

export const check = ({ commit }) => {
  commit(types.CHECK);
};

export const set = ({ commit }, account = defaultAccount) => {
  commit(types.SET, account);
};

export const update = ({ commit }, account) => {
  commit(types.UPDATE, account);
  Vue.router.push({
    name: "thankyou.index"
  });
};

export const remove = ({ commit }) => {
  commit(types.REMOVE);
};

export default {
  check,
  set,
  update,
  remove
};
