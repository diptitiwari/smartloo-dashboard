<template>
  <div
    v-on-clickaway="hideMobile"
    class="sidebar eb-sidebar">
    <slot>Sidebar</slot>
  </div>
</template>
<script>
import { mixin as clickaway } from "vue-clickaway";
import { hideMobile } from "../../mixins/hideMobile";

export default {
  name: "Sidebar",
  mixins: [clickaway, hideMobile],
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.isFixed();
  },
  methods: {
    isFixed() {
      this.fixed ? document.body.classList.add("sidebar-fixed") : document.body.classList.remove("sidebar-fixed");
      return this.fixed;
    }
  }
};
</script>
<style scoped>

.eb-sidebar{
  z-index: 9999 !important;
  background: #344349;
  bottom: 0;
  -webkit-transition: all .2s ease-out;
  transition: all .2s ease-out;
  -webkit-box-shadow: 0 0 35px 0 rgba(154,161,171,.15);
  box-shadow: 0 0 35px 0 rgba(154,161,171,.15);
}
</style>
<style>

.sidebar .nav-link .nav-icon{
  color:white !important;
}
</style>

