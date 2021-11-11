<template>
  <eb-card
    title="Sensor"
    class="card-min-hg"
    icon="fa fa-thermometer-half">
    <b-row v-if="getIOT.sensor.status">
      <b-col
        class="h2 font-weight-bold text-black"
        align="center">{{ getIOT.sensor.active }}</b-col>
      <b-col
        class="h2 font-weight-bold text-black"
        align="center">{{ getIOT.sensor.deactivate }}</b-col>
    </b-row>
    <b-row v-if="getIOT.sensor.status">
      <b-col align="center">Active</b-col>
      <b-col align="center">Inactive</b-col>
    </b-row>
    <b-row
      v-else
      class="py-3">
      <b-col
        md="12"
        align="center">
        <span class="h6 font-weight-lighter text-white-50">{{ getIOT.sensor.message }}</span>
      </b-col>
    </b-row>
  </eb-card>
</template>

<script>
import EbCard from "@/components/common/Card.vue";

export default {
  name: "TotalSensor",
  components: {
    EbCard
  },
  computed: {
    siteInfoSummary() {
      return this.$store.getters["site/getSummary"];
    },
    getIOT() {
      return this.$store.getters["site/getIOT"];
    }
  }
};
</script>

<style scoped>
</style>
