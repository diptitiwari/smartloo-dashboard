<template>
  <eb-card
    :title="chartType"
    class="card-min-hg"
    icon="fa fa-smile-o">
    <b-row id="user-chart" v-if="getIOT.feedBack.status">
      <b-col
        md="12"
        align="center">
        <pie-chart
          :label="labels"
          :datasets="dataSets"
          :width="200"
          :height="150" />
        <br >
      </b-col>
    </b-row>
    <b-row
      v-else
      class="my-2">
      <b-col
        md="12"
        align="center"
        class="mt-4 mb-1">
        <span class="h6 font-weight-lighter text-white-50">{{ getIOT.feedBack.message }}</span>
      </b-col>
    </b-row>
  </eb-card>
</template>

<script>
import EbCard from "@/components/common/Card.vue";
import PieChart from "@/components/charts/PieChart.vue";

export default {
  name: "TodayUsage",
  components: {
    EbCard,
    PieChart
  },
  props: ["chartType", "feedBackData"],
  computed: {
    labels() {
      return Object.keys(this.feedBackData);
    },
    dataSets() {
      return Object.values(this.feedBackData);
    },
    getIOT() {
      return this.$store.getters["site/getIOT"];
    }
  }
};
</script>

<style scoped>
#user-chart {
  justify-content: center;
}
.card-min-hg {
  max-height: 200px !important;
}
</style>
