<template>
  <div class="material">
    <h3 class="mt-4 mb-2">물질명 인덱스</h3>
    <hr class="mb-4" />
    <div class="confirmSample wrapperSpace">
      <v-row>
        <v-col cols="12" sm="2">
          <h4>연료명칭</h4>
          <v-select
            width="450"
            :items="code.M"
            outlined
            v-model="param.rmav"
            placeholder="전체"
          ></v-select>
        </v-col>
      </v-row>
    </div>
    <div class="wrapperEnd">
      <v-card-actions>
        <v-btn depressed @click="reset">초기화</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="search">검색</v-btn>
      </v-card-actions>
    </div>
    <h3 class="mt-16 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">
        목록
        <v-btn depressed color="primary" @click="addIndex">등록</v-btn>
      </div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      :domName="grid"
      ref="grid"
      :settings="settings"
      @changePage="loadData"
      @dbClick="dbClick"
    />
  </div>
</template>
<script>
import { columns, fields, height } from "@/assets/grid/materialIndex";
import RealGrid from "@/components/RealGrid.vue";
import { mapState } from "vuex";
import { subsMasterList } from "api/subIndex/subIndex";
import _ from "lodash";
export default {
  data() {
    return {
      grid: "materialIndex",
      settings: {
        columns,
        fields,
        height,
      },
      param: {
        rmav: "",
        pageSize: 10,
      },
      currentpage: 1,
    };
  },
  computed: {
    ...mapState("common", ["code"]),
  },
  methods: {
    newSample() {
      this.$emit("newSample");
    },
    loadData(v) {
      this.search(v);
    },
    search(v) {
      subsMasterList({ ...this.param, currentPage: _.isNumber(v) ? v : 1 })
        .then((res) => {
          const response = res.data;
          const items = response.data.items;
          const page = response.data.params;
          this.$refs.grid.loadData(items);
          this.$refs.grid.setPage(page);
        })
        .catch(() => {});
    },
    reset() {},
    addIndex() {
      this.$emit("materialIndexAdd");
    },
    dbClick(data) {
      console.log("dbClick");
      this.$emit("dbClick", data);
    },
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss">
.material {
  .v-input__slot {
    width: 200px;
  }
}
</style>
