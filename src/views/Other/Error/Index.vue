<template>
  <v-layout>
    <div class="row justify-content-center justify-vert-hor">
      <span class="title">Page Not Found</span>
      <span class="comment">The page you were looking for wasn't found,</span>
      <span class="comment">
        <span @click="back">Go back</span>to the previous page.
      </span>
    </div>
  </v-layout>
</template>

<script>
/* ============
 * Error Index Page
 * ============
 *
 * Page for not found.
 */

import VLayout from "@/layouts/Error.vue";

export default {
  /**
   * The name of the page.
   */
  name: "ErrorIndex",

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
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.title {
  font-size: 60px;
  font-weight: 500;
  line-height: 1.07;
  color: #263035;
  margin-bottom: 20px;
}

.comment {
  color: #7c7d8d;
  opacity: 1 !important;
  margin-bottom: 10px;
}

.comment span {
  color: #264eee !important;
  cursor: pointer;
  margin-right: 5px;
}
</style>
