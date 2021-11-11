<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: {
    datasets: {
      type: Array,
      default: null
    },
    lable: {
      type: Array,
      default: () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    }
  },
  watch: {
    datasets(newVal, oldVal) {
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
          labels: this.lable,
          datasets: this.datasets
        },
        {
          legend: {
            fullWidth: true,
            labels: {
              fontColor: "#fff",
              fontFamily: "Montserrat",
              fontSize: 11,
              usePointStyle: true
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            enabled: true
          },
          scales: {
            xAxes: [
              {
                /* gridLines: {
                color: 'transparent',
                drawBorder: false,
              },
              */
                stacked: true,
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                /* gridLines: {
              drawBorder: false,
              borderDash: [5, 5],
              color: '#BBBBBB',
            }, */
                stacked: true,
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  display: true
                }
                /* ticks: {
              beginAtZero: true,
              padding: 15,
            }, */
              }
            ]
          },
        }
      );
    }
  }
};
</script>
