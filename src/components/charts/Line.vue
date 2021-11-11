<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
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
      const result = newVal;
      result["0"].backgroundColor[24] = "#508ac4";
      this.makeChart();
    }
  },
  mounted() {
    this.makeChart();
  },
  methods: {
    makeChart() {
      this.renderChart(
        {
          labels: this.label,
          datasets: this.datasets
        },
        {
          fill: false,
          backgroundColor: "#508ac4",
          responsive: true,
          maintainAspectRatio: true,
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                stacked: true,
                gridLines: {
                  display: true
                },
                ticks: {
                  display: true,
                  min: 0,
                  max: 100,
                  stepSize: 50
                }
              }
            ]
          }
        }
      );
    }
  }
};
</script>
