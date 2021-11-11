<template>
  <div class="col-md-12 header">
    <span class="col-md-6 logo">
      <img
        v-if="!error"
        src="../assets/logo.png"
        width="75.6px"
        height="80.9px"
        @click="gotoHome()">
      <img
        v-else
        src="../assets/logo_error.png"
        width="75.6px"
        height="80.9px"
        @click="gotoHome()">
    </span>
    <template v-if="!isAuthenticated()">
      <template v-if="error">
        <span class="col-md-6" >
          <v-btn-normal
            :on-click="signup"
            style="float: right; margin-top: 13px">Sign in</v-btn-normal>
        </span>
      </template>
      <template v-else>
        <span class="col-md-6">
          <v-btn-normal
            v-if="!isSigninStep"
            :on-click="signin"
            :type="'btn-green'"
            style="float: right; margin-top: 13px">Sign in</v-btn-normal>
        </span>
      </template>
    </template>
    <template v-else>
      <template v-if="error">
        <span class="col-md-6" >
          <v-btn-normal
            :on-click="logout"
            :type="'btn-green'"
            style="float: right; margin-top: 13px; margin-left: 40px">Log out</v-btn-normal>
          <v-btn-normal
            :on-click="logout"
            style="float: right; margin-top: 13px; margin-left: 40px">Log out</v-btn-normal>
        </span>
      </template>
      <template v-else>
        <span class="col-md-6" >
          <v-btn-normal
            :on-click="logout"
            :type="'btn-green'"
            style="float: right; margin-top: 13px">Log out</v-btn-normal>
        </span>
      </template>
    </template>
  </div>
</template>

<script>
/* ============
 * Header Layout
 * ============
 */
import VBtnNormal from "../components/buttons/BtnNormal.vue";

export default {
  /**
   * The name of the layout.
   */
  name: "Header",

  components: {
    "v-btn-normal": VBtnNormal
  },

  props: {
    error: false
  },

  data() {
    return {
      isSigninStep: this.$store.state.page.loginStep
    };
  },

  mounted() {
    console.log(this.$router.path);
  },

  methods: {
    signup() {
      this.$router.push({ name: "register.index" });
    },

    signin() {
      this.$router.push({ name: "login.index" });
    },

    logout() {
      this.$store.dispatch("auth/logout");
    },

    check() {

    },

    isAuthenticated() {
      return this.$store.state.auth.authenticated;
    },

    gotoHome() {
      this.$router.push({ name: "index" });
    }
  }
};
</script>

<style scoped>
	.float-right {
		text-align: right;
	}

	.header {
		padding: 37px 8% 0 8%;
	}

	.logo img {
		cursor: pointer;
	}
</style>
