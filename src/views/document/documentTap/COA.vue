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
              v-model="input.lotNum"
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
              v-model="input.name"
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
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
  </div>
</template>
<script>
import validSet from "@/assets/valid";
import { columns, fields, rows, height } from "@/assets/grid/coaDetail";
import RealGrid from "@/components/RealGrid.vue";
export default {
  data() {
    return {
      validSet,
      grid: "cda",
      input: {
        lotNum: "",
        sampleCode: "",
        name: "",
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
      return this.$refs.form.validation();
    },
    exelDownload() {},
    search() {
      if (this.valid()) {
        //TODO
      }
    },
    reset() {},
    loadData() {},
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss"></style>
