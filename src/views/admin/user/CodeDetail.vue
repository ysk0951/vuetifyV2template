<template>
  <div>
    <h3 class="mt-4 mb-2">공통코드 상세</h3>
    <hr class="mb-4" />
    <h4 class="mt-10 mb-2">기본 정보</h4>
    <hr class="mb-4" />
    <h4 class="mt-10 mb-2">상세 정보</h4>
    <hr class="mb-4" />
    <div class="service login">
      <div class="filter">
        <v-row class="row">
          <v-col cols="12" sm="3">
            <h4>공통코드명</h4>
            <v-text-field
              outlined
              dense
              placeholder="공통코드명을 입력해주세요"
              v-model="input.gubun"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <h4>코드</h4>
            <v-text-field
              outlined
              dense
              filled
              disabled
              v-model="input.code"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div class="wrapperSpace">
        <div></div>
      </div>
      <h3 class="mt-16 mb-2 pl-1 pr-1">
        <div class="wrapperSpace">
          목록
          <div>
            <v-btn depressed>삭제</v-btn>
            <v-btn depressed color="primary">항목추가</v-btn>
          </div>
        </div>
      </h3>
      <hr class="mb-4" />
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
import { columns, fields, rows, height } from "@/assets/grid/codeMgn";
import RealGrid from "@/components/RealGrid.vue";
export default {
  props: ["data"],
  data() {
    return {
      input: {
        gubun: "",
        code: "",
      },
      settings: {
        columns,
        fields,
        rows,
        height,
      },
      grid: "codeDetai",
      currentPage: 1,
      pageSize: 10,
      saveParam: {},
    };
  },
  computed: {},
  mounted() {},
  methods: {
    reset() {
      this.input = {};
    },
    loadData(v) {
      this.currentPage = v;
      this.onApprove();
    },
    onApprove() {},
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
