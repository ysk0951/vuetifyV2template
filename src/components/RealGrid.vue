<template>
  <div class="real">
    <div :id="gridName" style="width: 100%; height: 480px"></div>
  </div>
</template>

<script>
import { GridView, LocalDataProvider } from "realgrid";
export default {
  name: "RealGrid",
  props: ["domName", "settings"],
  data: function () {
    return {
      gridName: this.domName,
      gv: null,
      dp: null,
    };
  },
  methods: {
    loadData: function (row) {
      console.log(row);
      this.dp.setRows(row);
    },
  },
  mounted() {
    this.dp = new LocalDataProvider(false);
    this.gv = new GridView(this.gridName);
    this.gv.displayOptions.fitStyle = "even";
    this.gv.setDataSource(this.dp);
    this.dp.setFields(this.settings.fields);
    this.gv.setColumns(this.settings.columns);
  },
};
</script>
