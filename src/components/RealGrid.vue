<template>
  <div class="real">
    <div
      :id="gridName"
      :style="'width: 100%; height: ' + settings.height + 'px'"
    ></div>
    <div class="text-center mt-2">
      <v-pagination depressed v-model="page" :length="10"></v-pagination>
    </div>
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
      page: 1,
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
    this.gv.displayOptions.rowHeight = 30;
    this.gv.setDataSource(this.dp);
    this.dp.setFields(this.settings.fields);
    this.gv.header.height = 40;
    this.gv.setColumns(this.settings.columns);
  },
};
</script>
<style>
.v-pagination__item {
  box-shadow: none !important;
}
</style>
