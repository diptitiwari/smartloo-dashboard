/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

// Modules
import account from "./modules/account";
import auth from "./modules/auth";
import page from "./modules/page";
import site from "./modules/site";


const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  /**
   * Assign the modules to the store.
   */
  modules: {
    account,
    auth,
    page,
    site
  },

  /**
   * If strict mode should be enabled.
   */
  strict: debug,

  /**
   * Plugins used in the store.
   */
  plugins: debug ? [createLogger()] : []
});
