<template>
  <div class="sidebar">
    <div class="logo col-md-12 row justify-content-center">
      <img
        src="../assets/logo.png"
        @click="gotoHome()">
    </div>
    <div class="account-info col-md-12">
      <span class="user-name col-md-12 text-center">{{ username }}</span>
      <span class="account-type col-md-12 text-center">{{ role }}</span>
    </div>
    <div class="tab-list col-md-12">
      <template v-for="(tab, idx) in tabList">
        <div
          v-if="isEnabled(tab.roleNames)"
          :key="idx"
          class="tab col-md-12"
          @click="onTabClick(tab.navigateUrl)">
          <span class="icon"><img
            :src="tab.iconUrl"
            :width="tab.iconWidth"></span>
          <span class="_title">{{ tab.title }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
/* ============
 * Sidebar Layout
 * ============
 */
import VBtnNormal from "../components/buttons/BtnNormal.vue";

export default {
  /**
   * The name of the layout.
   */
  name: "Sidebar",

  components: {
    "v-btn-normal": VBtnNormal
  },

  props: {
    error: false
  },

  data() {
    return {
      username: "",
      role: "",
      tabList: [
        {
          title: "Dashboard",
          iconUrl: require("../assets/icons/dashboard.png"),
          navigateUrl: "home.dashboard",
          roleNames: ["admin"],
          iconWidth: 22
        },
        {
          title: "User",
          iconUrl: require("../assets/icons/add-user.png"),
          navigateUrl: "home.user-register",
          roleNames: ["admin"],
          iconWidth: 22
        },
        {
          title: "Site Register",
          iconUrl: require("../assets/icons/site.png"),
          navigateUrl: "home.site-register",
          roleNames: ["supervisor", "admin"],
          iconWidth: 28
        },
        {
          title: "Firmware",
          iconUrl: require("../assets/icons/firmware.png"),
          navigateUrl: "home.firmware",
          roleNames: ["superadmin"],
          iconWidth: 28
        },
        /* {
          title: 'Section Register',
          iconUrl: require('../assets/icons/section.png'),
          navigateUrl: 'home.section-register',
          roleNames: ['supervisor', 'admin'],
          iconWidth: 28,
        },
        {
          title: 'Sensor Register',
          iconUrl: require('../assets/icons/sensor_device.png'),
          navigateUrl: 'home.sensor',
          roleNames: ['admin', 'supervisor'],
          iconWidth: 22,
        }, */
        {
          title: "Settings",
          iconUrl: require("../assets/icons/settings.png"),
          navigateUrl: "home.settings",
          roleNames: ["admin", "supervisor"],
          iconWidth: 22
        },
        {
          title: "Log out",
          iconUrl: require("../assets/icons/logout.png"),
          navigateUrl: "home.logout",
          roleNames: ["admin", "supervisor"],
          iconWidth: 20
        }
      ]
    };
  },

  mounted() {
    const { account } = this.$store.state;
    this.username = `${account.name}`;
    this.role = account.role_names[0];
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

    onTabClick(url) {
      switch (url) {
        case "home.logout":
          return this.logout();
        default:
          this.$router.push({ name: url });
      }
    },

    isEnabled(roleNames) {
      return roleNames.indexOf(this.role) >= 0;
    },

    gotoHome() {
      this.$router.push({ name: "home.index" });
    }
  }
};
</script>

<style scoped>
	.sidebar {
        height: 100vh;
        width: 250px;
        overflow: auto;
        padding: 22px 0;
        display: inline-block;
        z-index: 100;
        box-shadow: 0px 0px 10px 10px rgb(0, 0, 0, 0.1);
    }

    .logo {
        margin: unset !important;
    }

    .logo img {
        width: 52px;
        height: 56px;
        cursor: pointer;
    }

    .account-info {
        margin: 64px 0 50px 0px;
        display: inline-grid;
    }

    .user-name {
        font-size: 18px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #ffffff;
    }

    .account-type {
        font-size: 13px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: rgba(255, 255, 255, 0.27);
        text-transform: uppercase;
    }

    .tab-list {
        padding: unset !important;
    }

    .tab-list .tab{
        padding: 13px 0 15px 72px;
        margin-top: 4px;
        cursor: default;
    }

    .tab-list .tab.active {
        background-color: rgb(255, 255, 255, 0.2) !important;
    }

    .tab-list .tab:hover {
        background-color: rgb(255, 255, 255, 0.1);
    }

    .tab-list ._title {
        font-size: 15px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #ffffff;
        margin-left: 30px;
    }

    .tab-list .icon {
        width: 28px;
        height: 28px;
        position: relative;
    }

    .icon img {
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
</style>
