<template>
  <div>
    <div class="background">
      <!-- <div class="small-background"> -->
      <v-header :error="true"/>
      <div class="row justify-content-center min-height-auth">
        <div class="col col-md-12">
          <slot />
        </div>
      </div>
      <v-footer :error="true"/>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
/* ============
 * Minimal Layout
 * ============
*/
import VHeader from "@/layouts/Header.vue";
import VFooter from "@/layouts/Footer.vue";

export default {
  /**
   * The name of the layout.
   */
  name: "MinimalLayout",
  /**
   * The components the page can use.
   */
  components: {
    "v-header": VHeader,
    "v-footer": VFooter
  }
};
</script>

<style scoped>
  .background:before {
    content: '';
    position: absolute;
    top: 0;
		left: 0;
		width: 100vw;
    height: 80vh;
    background: url(../assets/background_error.png) no-repeat;
    background-size: 100% 100%;
  }

	/* .small-background:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 17.5vw;
    height: 14.5vh;
    background: url(../assets/wave_small.png) no-repeat;
    background-size: 100% 100%;
	} */

  .justify-content-center {
    margin: 0 !important;
  }
</style>
