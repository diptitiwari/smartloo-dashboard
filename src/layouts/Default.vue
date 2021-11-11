<template>
  <div>
    <template v-if="!isAuthenticated">
      <div class="background">
        <v-header/>
        <div class="row justify-content-center min-height-auth">
          <div class="col col-md-12">
            <slot/>
          </div>
        </div>
        <v-footer/>
      </div>
    </template>
    <template v-else>
      <div class="background dash">
        <v-sidebar/>
        <div class="dashboard-content">
          <div
            :class="{'full-height-dashboard': hideFooter, 'min-height-dashboard': !hideFooter}"
            class="row justify-content-center">
            <div
              :class="{'white-bg': backWhite}"
              class="col col-md-12 slot-div">
              <!-- Content will be placed here -->
              <slot/>
            </div>
          </div>
          <v-footer v-if="!hideFooter"/>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
/* ============
 * Default Layout
 * ============
*/
import VHeader from "@/layouts/Header.vue";
import VFooter from "@/layouts/Footer.vue";
import VSidebar from "@/layouts/Sidebar.vue";

export default {
  /**
   * The name of the layout.
   */
  name: "MinimalLayout",

  components: {
    "v-header": VHeader,
    "v-footer": VFooter,
    "v-sidebar": VSidebar
  },
  /**
   * The components the page can use.
   */
  props: {
    hideFooter: null,
    backWhite: null
  },

  data() {
    return {
      isAuthenticated: false
    };
  },

  mounted() {
    this.isAuthenticated = this.$store.state.auth.authenticated;
  },

  methods: {

  }
};
</script>

<style scoped>
  .background.dash {
    display: inline-flex;
  }

  .background:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url(../assets/background.png) no-repeat;
    background-size: 100% 100%;
  }

  .justify-content-center {
    margin: 0 !important;
  }

  .dashboard-content {
    width: calc(100vw - 250px);
    height: 100vh;
    overflow: auto;
    position: relative;
  }

  .min-height-dashboard > div {

  }

  .white-bg {
    background-color: #f5f9ff;
    padding-right: 0px;
    padding-left: 0px;
  }
</style>
