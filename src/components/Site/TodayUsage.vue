<template>
  <eb-card
    :title="title"
    class="card-min-hg"
    icon="fa fa-users">
    <div v-if="todayUsage.status">
      <b-row>
        <b-col
          class="h2 font-weight-bold text-black"
          align="center">{{ todayUsage.currentDay }}</b-col>
        <b-col
          class="h2 font-weight-bold text-black"
          align="center">{{ todayUsage.weekUsage }}</b-col>
      </b-row>
      <b-row>
        <b-col align="center">Current Day</b-col>
        <b-col align="center">Week Usage</b-col>
      </b-row>
    </div>
    <div v-else>
      <b-row class="my-2">
        <b-col
          md="12"
          align="center"
          class="mt-4 mb-1">
          <span class="h6 font-weight-lighter text-white-50">{{ todayUsage.message }}</span>
        </b-col>
      </b-row>
    </div>
  </eb-card>
</template>

<script>
import EbCard from "@/components/common/Card.vue";

export default {
  name: "TodayUsage",
  components: {
    EbCard
  },
  props: {
    title: {
      type: String,
      default: "Today Usage"
    }
  },
  computed: {
    siteInfoSummary() {
      return this.$store.getters["site/getSummary"];
    },
    todayUsage() {
      const data = this.$store.getters["site/getIOT"];
      return data.todayUsage;
    }
  }
};
</script>

<style scoped>
.card-min-hg {
  min-height: 264px !important;
}
</style>
