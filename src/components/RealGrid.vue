<template>
  <div class="real">
    <div :id="gridName" style="width: 100%; height: 480px"></div>
  </div>
</template>

<script>
import _ from "lodash";
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
      this.dp.setRows(row);
    },
    getRow: function () {
      return this.dp.getRows(0, -1);
    },
    getCol: function () {
      return this.gv.getColumns();
    },
    getCheckedRow: function () {
      const idx = this.gv.getCheckedRows(true, false, false);
      const allRows = this.dp.getRows(0, -1);
      const rows = [];
      _.each(idx, function (v) {
        rows.push(allRows[v]);
      });
      return rows;
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
