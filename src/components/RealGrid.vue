<template>
  <div class="real">
    <div :id="gridName" style="width: 100%; height: 480px"></div>
  </div>
</template>

<script>
import { GridView, LocalDataProvider } from "realgrid";
import { columns, fields, rows } from "./realgrid-data";
export default {
  name: "RealGrid",
  props: ["domName"],
  data: function () {
    return {
      gridName: this.domName,
      gv: null,
      dp: null,
    };
  },
  methods: {
    loadData: function () {
      this.dp.setRows(rows);
    },
  },
  mounted() {
    console.log(this.gridName);
    this.dp = new LocalDataProvider(false);
    this.gv = new GridView(this.gridName);
    this.gv.displayOptions.fitStyle = "even";
    this.gv.setDataSource(this.dp);
    this.dp.setFields(fields);
    this.gv.setColumns(columns);
  },
};
</script>
