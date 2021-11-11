import { Doughnut, mixins } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: ["data", "options"],
  methods: {
    createChart() {
      this.renderChart(this.data, {
        ...this.options
      });
    }
  },
  watch: {
    data(value, oldValue) {
      console.log("Data Watch", value, oldValue);
    }
  },
  mounted() {
    this.createChart();
  }
};
