<template>
  <div class="heremap">
    <HereMap
      :markers="markers"
      :sites="sites"
      :lat="home.lat"
      :lng="home.lng"
      width="100%"
      height="calc(100vh - 30px)"
    />
  </div>
</template>

<script>
import VLayout from "@/layouts/Default.vue";
import HereMap from "@/layouts/MyHereMap.vue";
import Vue from "vue";

export default {
  name: "DashboardIndex",
  components: {
    VLayout,
    HereMap
  },

  data() {
    return {
      markers: [],
      sites: [],
      home: {
        lat: "",
        lng: ""
      }
    };
  },

  created() {
    Vue.$http
      .get("sites")
      .then((response) => {
        const res = response.data;
        this.sites = res.sites;
        this.home.lat = res.home_location.latitude;
        this.home.lng = res.home_location.longitude;
      })
      .catch((error) => {
        const res = error.response.data;
        this.$notify({
          group: "alert",
          type: "error",
          text: res.error,
          width: 400
        });
      });
  }
};
</script>
<style scoped>
.heremap {
  width: 100%;
}
.map-box {
  height: calc(100% - 133px);
  margin-top: 30px;
  display: grid;
}
</style>
