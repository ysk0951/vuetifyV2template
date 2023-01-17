<template>
  <div>
    <h3 class="mt-4 mb-2">CDA 관리</h3>
    <hr class="mb-4" />
    <v-form lazy-validation ref="form">
      <div class="wrapperSpace">
        <v-row class="pl-2">
          <v-col cols="12" sm="2">
            <h4>Lot Co</h4>
            <v-text-field
              outlined
              dense
              placeholder="Lot Co를 입력해주세요"
              v-model="input.lot_no"
              :rules="[this.validSet.commonCodeHipen]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>샘플코드</h4>
            <v-text-field
              outlined
              dense
              placeholder="샘플코드를 입력해주세요"
              v-model="input.sampleCode"
              :rules="[this.validSet.commonCodeHipen]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>요청자</h4>
            <v-text-field
              outlined
              dense
              placeholder="요청자를 입력해주세요"
              v-model="input.request_name"
              :rules="[this.validSet.name]"
            ></v-text-field>
          </v-col>
        </v-row>
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
    <div class="wrapperSpace pr-2">
      <div>
        <h4 class="mt-4 mb-2">목록</h4>
      </div>
      <v-btn depressed color="primary" @click="exelDownload"
        >엑셀 다운로드</v-btn
      >
    </div>
    <hr />
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
import validSet from "@/assets/valid";
import RealGrid from "@/components/RealGrid.vue";
import { columns, fields, rows, height } from "@/assets/grid/coa";
import { sampleSearch } from "api/sample/sample";
import { getExecl } from "api/file";
import _ from "lodash";
export default {
  data() {
    return {
      validSet,
      grid: "cda",
      input: {
        lot_no: "",
        sampleCode: "",
        request_name: "",
        page_size: 1,
      },
      settings: {
        columns,
        fields,
        rows,
        height,
        errorMessage: "내역이 존재하지 않습니다",
      },
    };
  },
  methods: {
    valid() {
      return this.$refs.form.validate();
    },
    exelDownload() {
      getExecl(this.$refs.grid.getCheckedRow(), "coa");
    },
    async search(v) {
      console.log(this.$refs.form);
      if (this.valid()) {
        const res = await sampleSearch({
          ...this.input,
          currentPage: _.isNumber(v) ? v : 1,
        });
        const response = res.data;
        const items = response.data.items;
        const page = response.data.params;
        this.$refs.grid.loadData(items);
        this.$refs.grid.setPage(page);
      }
    },
    reset() {},
    loadData(v) {
      this.search(v);
    },
    dbClick() {},
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss"></style>
