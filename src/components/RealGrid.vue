<template>
  <div class="real">
    <div
      :id="gridName"
      :style="'width: 100%; height: ' + settings.height + 'px'"
    ></div>
    <div class="text-center mt-2" v-if="!nonePage">
      <v-pagination
        depressed
        v-model="page.currentPage"
        :length="Math.ceil(page.totalRows / page.pageSize)"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { GridView, LocalDataProvider } from "realgrid";
export default {
  name: "RealGrid",
  props: ["domName", "settings", "nonePage"],
  data: function () {
    return {
      gridName: this.domName,
      gv: null,
      dp: null,
      page: {
        currentPage: 1,
        totalRows: 10,
        pageSize: 10,
      },
    };
  },
  watch: {
    "page.currentPage": function (v) {
      this.$emit("changePage", v);
    },
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
    setGroup(groupingInfo) {
      this.gv.setColumnLayout(groupingInfo);
    },
    getCheckedRow: function () {
      const idx = this.gv.getCheckedRows(true, false, false);
      const rows = [];
      _.each(idx, (v) => {
        rows.push(this.dp.getJsonRow(v));
      });
      return rows;
    },
    setColor() {},
    setPage: function (v) {
      this.page = {
        currentPage: Number(v.currentPage),
        totalRows: v.totalRows,
        pageSize: Number(v.pageSize),
      };
    },
    getPage: function () {
      return this.page;
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
    this.gv.setCheckBar({
      exclusive: this.settings.exclusive,
    });
    this.gv.onCellClicked = (grid, clickData) => {
      this.gv.checkRow(clickData.dataRow, true);
      this.$emit("click", { grid, clickData });
    };

    // this.gv.setColumnLayout(["ITEM1", "UNIT1", "RESULT1"]);
    if (this.settings.grouping) {
      this.setGroup(this.settings.grouping);
    }
  },
};
</script>
<style>
.v-pagination__item {
  box-shadow: none !important;
}
</style>
