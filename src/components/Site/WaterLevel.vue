<template>
  <eb-card
    title="Water Level"
    class="card-min-hg"
    icon="fa fa-tint">
    <b-row v-if="getIOT.waterLevel.status">
      <b-col md="12" align="center">
        <span class="h3 font-weight-bold text-black" v-show="getIOT.waterLevel.current">
          {{ getIOT.waterLevel.current.level }}%
        </span>
      </b-col>
      <b-col md="12" align="center">
        <span class="h6" >{{ getIOT.waterLevel.current.time }}</span>
      </b-col>

      <b-col md="12" align="center" class="mt-3">
        <line-chart
          :width="240"
          :height="100"
          :label="getIOT.waterLevel.label"
          :datasets="getIOT.waterLevel.dataSets"
        />
      </b-col>
    </b-row>

    <b-row
      v-else
      class="my-2">
      <b-col
        md="12"
        align="center"
        class="mt-4 mb-1">
        <span class="h6 font-weight-lighter text-white-50">{{ getIOT.waterLevel.message }}</span>
      </b-col>
    </b-row>
    <!-- <eb-waves> </eb-waves> -->
  </eb-card>
</template>

<script>
import EbCard from "../common/Card";
import EbWaves from "./Waves";
import LineChart from "@/components/charts/Line.vue";

import { WaterLevel } from "@/services/site";

export default {
  name: "WaterLevel",
  components: {
    EbCard,
    EbWaves,
    LineChart
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
.card-min-hg {
  max-height: 264px !important;
}
</style>
