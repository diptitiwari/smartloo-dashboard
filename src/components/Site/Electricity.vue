<template>
  <eb-card
    title="Electricity"
    class="card-min-hg"
    icon="fa fa-plug">
    <b-row class="py-3">
      <b-col
        md="12"
        align="center">
        <span
          v-if="siteInfoSummary.electricity.status"
          class="h1 font-weight-bold text-black"
        >
          <img
            v-if="getIOT"
            src="../../assets/icons/lightbulb_on.png"
            width="60"
            style="margin-top: -2px"
          >
          <img
            v-else
            src="../../assets/icons/lightbulb_off.png"
            width="60"
            style="margin-top: -2px"
          >
          {{ getIOT ? 'On' : 'Off' }}
        </span>
        <span
          v-else
          class="h6 font-weight-lighter text-black-50">No data found</span>
      </b-col>
    </b-row>
  </eb-card>
</template>

<script>
import EbCard from "../common/Card.vue";

export default {
  name: "Electricity",
  components: {
    EbCard
  },
  computed: {
    siteInfoSummary() {
      return this.$store.getters["site/getSummary"];
    },
    getIOT() {
      const data = this.$store.getters["site/getIOT"];

      if (data.sensor.totalSensor === data.sensor.deactivate) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
</style>
