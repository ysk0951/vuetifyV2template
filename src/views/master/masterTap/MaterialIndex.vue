<template>
  <div class="material">
    <v-form ref="meterialIndex" lazy-validation>
      <div class="meterialIndex wrapperSpace px-2">
        <v-col cols="12" sm="3">
          <h4>자재코드</h4>
          <v-text-field
            outlined
            dense
            placeholder="자재코드를 입력해 주세요."
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>원료약어</h4>
          <v-text-field
            outlined
            dense
            placeholder="원료약어를 입력해 주세요."
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>화학물질명</h4>
          <v-text-field
            outlined
            dense
            placeholder="화학물질명을 입력해 주세요."
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>CAS NO.</h4>
          <v-text-field
            outlined
            dense
            placeholder="CAS NO를 입력해 주세요."
          ></v-text-field>
        </v-col>
      </div>
      <div class="meterialIndex wrapperSpace px-2">
        <v-col cols="12" sm="6">
          <h4>관용명 및 이명</h4>
          <v-text-field
            outlined
            dense
            placeholder="관용어 및 이명을 입력해 주세요."
          ></v-text-field>
        </v-col>
      </div>
    </v-form>
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
        errorMessage: "목록을 검색해주세요",
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
  mounted() {
    this.loadData();
  },
  methods: {
    newSample() {
      this.$emit("newSample");
    },
    loadData(v) {
      this.search(v);
    },
    search(v) {
      //TODO : param 추가 필요
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
    reset() {
      this.param.rmav = "";
    },
    addIndex() {
      this.$emit("materialIndexAdd");
    },
    dbClick(data) {
      this.$emit("dbClick", data);
    },
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss">
.meterialIndex {
  .v-input__slot {
    width: 100% !important;
  }
}
</style>
