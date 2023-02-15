<template>
  <div class="real">
    <div
      :id="gridName"
      :style="'width: 100%; height: ' + calHeight() + 'px'"
      v-show="existRow"
    ></div>
    <div v-show="!existRow">
      <div class="wrapper ma-16">
        <h4>{{ settings.errorMessage }}</h4>
      </div>
    </div>

    <div class="text-center mt-2 wrapper" v-if="!nonePage && existRow">
      <v-pagination
        depressed
        v-model="page.currentPage"
        :length="Math.ceil(page.totalRows / page.pageSize)"
        :total-visible="10"
      >
      </v-pagination>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { GridView, LocalDataProvider } from "realgrid";
export default {
  name: "RealGrid",
  props: ["domName", "settings", "nonePage"],
  computed: {
    existRow() {
      return this.dp && this.dp.getRowCount() > 0;
    },
  },
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
    getJsonRows: function () {
      return this.dp.getJsonRows(0, -1);
    },
    getRow: function () {
      return this.dp.getRows(0, -1);
    },
    getJsonRow: function () {
      return this.dp.getJsonRow(0);
    },
    getJsonRowByIdx: function (idx) {
      console.log(idx, "idx");
      return this.dp.getJsonRow(idx);
    },
    getJsonAllRow: function () {
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
    calHeight() {
      return this.settings.height ? this.settings.height : 480;
    },
  },
  mounted() {
    this.dp = new LocalDataProvider(false);
    this.gv = new GridView(this.gridName);
    this.gv.displayOptions.fitStyle = "fill";
    this.gv.displayOptions.rowHeight = 30;
    this.gv.setDataSource(this.dp);
    this.dp.setFields(this.settings.fields);
    this.gv.header.height = 40;
    this.gv.setColumns(this.settings.columns);
    this.gv.setFooter({
      visible: false,
    });
    this.gv.setCheckBar({
      exclusive: this.settings.radio,
    });
    this.gv.onCellDblClicked = (grid, clickData) => {
      const idx = clickData.dataRow;
      const dbClickRow = this.dp.getJsonRow(idx);
      this.$emit("dbClick", dbClickRow);
    };
    this.gv.setCheckBar({ visible: !this.settings.hideCheckBar });
    if (!this.settings.hideCheckBar) {
      this.gv.onCellClicked = (grid, clickData) => {
        this.$emit("click", { grid, clickData });
      };
    }
    this.gv.onCurrentChanging = (grid) => {
      grid.commit();
    };
    this.gv.onEditRowChanged = (
      grid,
      itemIndex,
      dataRow,
      field,
      oldValue,
      newValue
    ) => {
      grid.commit();
      this.$emit("changeData", {
        grid,
        itemIndex,
        dataRow,
        field,
        oldValue,
        newValue,
      });
    };
    this.gv.displayOptions.syncGridHeight = "always";
    if (this.settings.grouping) {
      this.setGroup(this.settings.grouping);
    }
    if (this.settings.fixRow) {
      this.gv.setFixedOptions({ colCount: this.settings.fixRow });
    }
    this.gv.setStateBar({ visible: false });
    this.gv.setRowIndicator({
      headText: "번호",
    });
    this.gv.onCellItemClicked = (grid, index) => {
      const row = this.dp.getJsonRow(index.dataRow);
      this.$emit("btnClick", row);
      return true;
    };
    if (this.settings.noneNo) {
      this.gv.setRowIndicator({
        headText: "번호",
        visible: false,
      });
    }
    if (this.settings.noneHeader) {
      this.gv.header.visible = false;
    }
  },
};
</script>
<style>
.v-pagination__item {
  box-shadow: none !important;
}
</style>
