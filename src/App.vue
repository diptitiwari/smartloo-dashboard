<template>
  <div id="app">
    <router-view/>
    <notifications
      group="alert"
      classes="vue-notification"
      position="bottom right"/>
  </div>
</template>
<script>
/* ============
 * Entry Point
 * ============
 *
 * The entry point of the application.
 */

export default {
  /**
   * The name of the application.
   */
  name: "Samagra",

  /**
   * Fires when the app has been mounted.
   */
  mounted() {
    // If the user is authenticated,
    // fetch the data from the API
    if (this.$store.state.auth.authenticated) {
      this.$store.dispatch("account/check");
    }
  }
};
</script>
<style>
@import '../src/assets/css/app.main.css'
</style>

