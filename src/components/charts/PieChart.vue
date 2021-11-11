<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    datasets: {
      type: Array,
      default: null
    },
    label: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    datasets(newVal, oldVal) {
      console.log('change value', newVal);
      this.makeChart();
    }
  },
  mounted() {
    this.makeChart();
  },
  methods: {
    makeChart() {
      this.renderChart({
        labels: this.label,
        datasets: [
          {
            backgroundColor: [
             "#E46651",
             "#41B883",
            ],
            data: this.datasets
          }
        ]
      }, {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          labels: {
            boxWidth: 10
          }
        }
      });
    }
  }
};
</script>
