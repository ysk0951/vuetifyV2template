<template>
  <div>
    <canvas id="chart" width="400" height="400"></canvas>
  </div>
</template>
<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default {
  methods: {
    fillData() {
      const ctx = document.getElementById("chart").getContext("2d");
      this.myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["RED", "BLUE"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19],
            },
          ],
        },
        option: {},
      });
    },
  },
  mounted() {
    this.fillData();
  },
  data() {
    return {
      myChart: null,
    };
  },
};
</script>
