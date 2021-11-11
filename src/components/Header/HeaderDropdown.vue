<template>
  <div>
    <b-nav-item-dropdown
      :right="right"
      :no-caret="noCaret"
      class="mr-3 profile">
      <template slot="button-content">
        <slot name="header">
          &#10068;
        </slot>
      </template>
      <slot name="dropdown">
        <div :style="{ right: 'auto', height: '200px' }">
          <span class="text-center">dropdown</span>
        </div>
      </slot>
    </b-nav-item-dropdown>
  </div>
</template>
<script>
export default {
  name: "HeaderDropdown",
  props: {
    right: {
      type: Boolean,
      default: false
    },
    noCaret: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: null
    };
  },
  mounted() {
    const user = this.$store.getters["auth/getUserID"];
    this.id = user;
  }
};
</script>
<style>
  .profile{
    background-color:#ffffff;
    margin-top: -9px !important;
    border: 1px;
  }
  .app-header .dropdown-item {
    min-width: 170px;
  }
</style>
