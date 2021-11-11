<template>
  <div
    :class="{'error': error, 'hide': isDashboardPage}"
    class="col-md-12 footer">
    @2019 Samagra. All Rights Reserved
  </div>
</template>

<script>
/* ============
 * Footer Layout
 * ============
 */

export default {
  /**
   * The name of the layout.
   */
  name: "Footer",

  components: {},

  props: {
    error: false
  },

  data() {
    return {
      isDashboardPage: false
    };
  },

  mounted() {
    console.log("this is footer", this.$route.name);
    this.isDashboardPage = this.$route.name == "home.dashboard";
  },

  methods: {}
};
</script>

<style scoped>
	.footer {
        bottom: 0;
        left: 0;
		    padding: 29px 0px 29px 0px;
        text-align: center;
        opacity: 0.6;
        font-size: 15px;
        line-height: 2;
        letter-spacing: normal;
        text-align: center;
        color: #ffffff;
        border-top: 1px solid #ababab;
	}

    .footer.error {
        color: #263035 !important;
        border-top: 1px solid #f2f2f2;
    }

    .footer.hide {
        display: none;
    }
</style>
