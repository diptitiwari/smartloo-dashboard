<template>
  <AppHeaderDropdown
    right
    no-caret>
    <template slot="header">
      <img
        src="img/avatars/boy.svg"
        class="img-avatar"
        alt="info@emperorbrains.com" >
      {{ user }}
    </template>
    <template slot="dropdown">
      <b-dropdown-item>
        <i class="fa fa-bell-o" /> Home
      </b-dropdown-item>
      <b-dropdown-item @click="logout">
        <i class="fa fa-lock" /> Logout
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@/components";

export default {
  name: "DefaultHeaderDropdownAccnt",
  components: {
    AppHeaderDropdown
  },
  data: () => ({
    user: null
  }),
  mounted() {
    this.user = this.$store.getters["account/getUserName"];
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      // window.sessionStorage.setItem('userLogin', JSON.stringify({}));
      // this.$store.dispatch('auth/loginUser', { _id: null });
      // this.$router.push({ name: 'Login' });
    }
  }
};
</script>
