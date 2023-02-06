<template>
  <div>
    <div>
      <div class="filter">
        <v-row class="row">
          <v-col cols="12" sm="3">
            <h4>공통코드명</h4>
            <v-text-field
              outlined
              dense
              filled
              disabled
              :value="this.data.gubun"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <h4>코드</h4>
            <v-text-field
              outlined
              dense
              filled
              disabled
              :value="this.data.code"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <h4 class="mt-10 mb-2">상세 정보</h4>
      <hr class="mb-4" />
      <div class="wrapperSpace">
        <div></div>
      </div>
      <RealGrid
        :domName="grid"
        ref="grid"
        :settings="settings"
        @changePage="loadData"
      />
    </div>
  </div>
</template>
<script>
import { getCode } from "api/common";
import { mapMutations } from "vuex";
import { columns, fields, rows, height } from "@/assets/grid/codeMgnDetail";
import RealGrid from "@/components/RealGrid.vue";
export default {
  props: ["data"],
  watch: {
    "this.data": {
      deep: true,
      handelr: function (v) {
        console.log(v);
      },
    },
  },
  data() {
    return {
      settings: {
        columns,
        fields,
        rows,
        height,
        errorMessage: "잘못된 접근입니다",
        hideCheckBar: true,
      },
      grid: "codeDetai",
      currentPage: 1,
      pageSize: 10,
      saveParam: {},
    };
  },
  computed: {},
  mounted() {
    this.loadData();
  },
  methods: {
    ...mapMutations("common", ["SET_CODE"]),
    async loadData() {
      const res = await getCode(this.data.code);
      const data = res.data.data;
      this.$refs.grid.loadData(data);
    },
  },
  components: {
    RealGrid,
  },
};
</script>
<style>
.login .v-input__slot {
  width: 100% !important;
}
</style>
