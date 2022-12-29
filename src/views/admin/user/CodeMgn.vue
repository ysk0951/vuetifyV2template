<template>
  <div>
    <h3 class="mt-4 mb-2">공통코드 관리</h3>
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
              v-model="input.code"
              :rules="[this.validSet.commonCode]"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div class="wrapperSpace">
        <div></div>
        <div class="wrapper">
          <v-card-actions>
            <v-btn depressed @click="reset">초기화</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn depressed color="primary" @click="onApprove">검색</v-btn>
          </v-card-actions>
        </div>
      </div>
      <h3 class="mt-16 mb-2 pl-1 pr-1">
        <div class="wrapperSpace">목록</div>
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
import { mapMutations, mapState } from "vuex";
import validSet from "@/assets/valid";
export default {
  data() {
    return {
      input: {
        code: "",
      },
      settings: {
        columns,
        fields,
        rows,
        height,
      },
      grid: "codeMgn",
      validSet,
      currentPage: 1,
      pageSize: 10,
      saveParam: {},
    };
  },
  computed: {
    ...mapState("select", ["workType", "roleType"]),
  },
  mounted() {
    this.SET_POPUP({
      title: "알림",
      height: 150,
      width: 300,
      customApprove: true,
    });
    this.input.roles = this.roleType[0];
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP", "SET_POPUP_TEXT"]),
    reset() {
      this.input = {
        code: "",
      };
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
