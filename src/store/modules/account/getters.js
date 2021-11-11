/* ============
 * Getters for the account module
 * ============
 *
 * The getters that are available on the
 * account module.
 */

export default {
  getUserName(state) {
    return state.name;
  },
  isAuth(state) {
    const role = state.role_names;
    const auth = role.filter(e => e === "superadmin" || e === "admin");
    return auth.length > 0;
  }
};
