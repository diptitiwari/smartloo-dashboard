<template>
  <eb-card title="WIFI Details">
    <div v-if="siteInfo.wifi_ssid && siteInfo.wifi_pwd">
      <b-row class="mt-2 pt-2">
        <b-col align="center">SSID</b-col>
        <b-col align="center">{{ siteInfo.wifi_ssid }}</b-col>
      </b-row>
      <b-row>
        <b-col align="center">Password</b-col>
        <b-col align="center">{{ siteInfo.wifi_pwd }}</b-col>
      </b-row>
    </div>
    <div v-else>
      <b-row class="my-2">
        <b-col
          md="12"
          align="center"
          class="mt-1 mb-1">
          <span class="h6 font-weight-lighter text-black-50">No data found</span>
        </b-col>
      </b-row>
    </div>
  </eb-card>
</template>

<script>
import EbCard from "@/components/common/Card.vue";

export default {
  name: "SiteInfo",
  components: {
    EbCard
  },
  computed: {
    siteInfo() {
      return this.$store.getters["site/getInfo"];
    }
  }
};
</script>

<style scoped>
.card-min-hg {
  min-height: 200px !important;
}
</style>
