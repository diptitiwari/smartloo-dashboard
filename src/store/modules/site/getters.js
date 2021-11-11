/* ============
 * Getters for the auth module
 * ============
 *
 * The getters that are available on the
 * auth module.
 */

export default {
  getIOT(state) {
    return state.iot;
  },
  getInfo(state) {
    return state.info;
  },
  getSection(state) {
    return state.info.sections;
  },
  getSummary(state) {
    return state.summary;
  },
  isSiteInfo(state) {
    return state.isSiteInfo;
  }
};
