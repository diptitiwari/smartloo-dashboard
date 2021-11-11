<template>
  <eb-card
    title="Today Rating Average"
    class="card-min-hg"
    icon="fa fa-star">
    <b-row class="my-2">
      <b-col
        md="12"
        align="center"
        class="mt-1 mb-1">
        <star-rating
          v-if="siteInfoSummary.rating.thirty_days"
          :rounded-corners="true"
          :rating="siteInfoSummary.rating.thirty_days"
          :show-rating="false"
          :star-size="40"
          read-only
        />
        <span
          v-else
          class="h6 font-weight-lighter text-black-50">No data found</span>
      </b-col>
    </b-row>
  </eb-card>
</template>

<script>
import EbCard from "../common/Card";
import StarRating from "vue-star-rating";

export default {
  name: "Rating",
  components: {
    EbCard,
    StarRating
  },
  computed: {
    siteInfoSummary() {
      return this.$store.getters["site/getSummary"];
    }
  }
};
</script>

<style scoped>
</style>
