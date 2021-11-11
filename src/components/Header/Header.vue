<template>
  <header
    :class="classList">
    <slot>Header</slot>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList() {
      return [
        "app-header",
        "navbar"
      ];
    }
  },
  mounted() {
    this.isFixed(this.fixed);
  },
  methods: {
    isFixed(fixed) {
      fixed ? document.body.classList.add("header-fixed") : document.body.classList.remove("header-fixed");
      return fixed;
    }
  }
};
</script>

<style scoped>

.eb-navbar-brand{
 margin-left: -16px !important;
    /* margin-top: -8px !important; */
    width: 200px!important;
    /* background: #fafbfe; */
    /* color: #fafbfe; */
    /* height: 70px!important; */
}

.app-header {
  height: 55px;
  border: 0px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 4px 6px #0000000F;
  opacity: 1;
}

</style>
