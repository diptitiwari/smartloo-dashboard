<template>
  <eb-card
    :title="chartType"
    class="card-min-hg"
    icon="fa fa-users">
    <b-row
      v-if="isData.status"
      id="user-chart">
      <b-col md="12">
        <bar-chart
          :width="200"
          :height="170"
          :lable="getLabel"
          :datasets="getData" />
      </b-col>
      <b-col
        md="12"
        align="center"
      >
        Last 7 days
      </b-col>
    </b-row>
    <b-row
      v-else
      class="my-2">
      <b-col
        md="12"
        align="center"
        class="mt-4 mb-1">
        <span class="h6 font-weight-lighter text-white-50">{{ isData.message }}</span>
      </b-col>
    </b-row>
  </eb-card>
</template>

<script>
import EbCard from "@/components/common/Card.vue";
import BarChart from "@/components/charts/Bar.vue";

export default {
  name: "WeekUsage",
  components: {
    EbCard,
    BarChart
  },
  props: ["chartType", "feedBackData"],
  computed: {
    isData() {
      const lbl = this.$store.getters["site/getIOT"];
      return lbl.todayUsage;
    },
    getLabel() {
      const lbl = this.$store.getters["site/getIOT"];
      return lbl.todayUsage.label;
    },
    getData() {
      const lbl = this.$store.getters["site/getIOT"];
      return lbl.todayUsage.dataset;
    }
  }
};
</script>

<style scoped>
.card-min-hg {
  max-height: 264px !important;
}
#user-chart {
  justify-content: center;
}
.report-overview-chart {
  max-height: 180px;
}
</style>
