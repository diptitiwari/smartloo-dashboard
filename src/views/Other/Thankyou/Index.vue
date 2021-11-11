<template>
  <v-layout>
    <div class="row justify-content-center justify-vert-hor">
      <img src="../../../assets/complete.png" >
      <span class="title">Thank you!</span>
      <span
        v-if="!isAuthenticated()"
        class="comment">Registration successful</span>
    </div>
  </v-layout>
</template>

<script>
/* ============
 * Thankyou Index Page
 * ============
 *
 * Page for thank you.
 */

import VLayout from "@/layouts/Default.vue";

export default {
  /**
   * The name of the page.
   */
  name: "ThankyouIndex",

  /**
   * The components the page can use.
   */
  components: {
    "v-layout": VLayout
  },

  /**
   * The data that can be used by the page.
   *
   * @returns {Object} The view-model data.
   */

  data() {
    return {};
  },

  /**
   * The methods the page can use.
   */
  methods: {
    isAuthenticated() {
      return this.$store.state.auth.authenticated;
    }
  }
};
</script>
<style scoped>
</style>
