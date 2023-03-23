<template>
  <div class="coa">
    <h3 class="mb-2">COA 상세</h3>
    <v-row class="px-2">
      <v-col cols="12" sm="3">
        <h4>Code Grade</h4>
        <v-text-field
          outlined
          dense
          disabled
          filled
          v-model="param.code"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>Lot No</h4>
        <v-text-field
          outlined
          dense
          disabled
          filled
          :value="param.lot_no"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>수량(Qty)</h4>
        <v-text-field
          outlined
          dense
          disabled
          filled
          :value="param.qty"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>제조일</h4>
        <v-text-field
          outlined
          dense
          disabled
          filled
          :value="this.data.qty"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="px-2">
      <v-col cols="12" sm="3">
        <h4>납품처</h4>
        <v-text-field outlined dense disabled filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="9">
        <h4>품명</h4>
        <v-text-field
          outlined
          dense
          disabled
          filled
          v-model="param.code_title"
        ></v-text-field>
      </v-col>
    </v-row>
    <h3 class="mt-16 mb-2">상세정보</h3>
    <hr class="mb-4" />
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
    <h3 class="mt-16 mb-2">PDF 업로드</h3>
    <hr class="mb-4" />
    <div class="wrapperFlex file">
      <v-text-field
        placeholder="파일을 선택해주세요"
        type="text"
        v-model="file.name"
        outlined
        dense
        disabled
        filled
      />
      <input
        class="d-none"
        ref="uploader"
        type="file"
        @change="onFileChanged"
      />
      <v-btn
        depressed
        class="ml-3 mr-3"
        color="primary fileBtn"
        @click="upload"
        :loading="isSelecting"
        >파일선택</v-btn
      >
      <v-btn depressed class="fileBtn" @click="read">불러오기</v-btn>
    </div>
    <v-row class="wrapper">
      <v-card-actions>
        <v-btn depressed @click="cancle">취소</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="save"> 저장 </v-btn>
      </v-card-actions>
    </v-row>
  </div>
</template>
<script>
import {
  columns,
  fields,
  rows,
  height,
  grouping,
} from "@/assets/grid/coaDetail";
import RealGrid from "@/components/RealGrid.vue";
import _ from "lodash";
import { coadetail } from "api/sample/sample";

export default {
  props: ["data"],
  watch: {
    param: {
      deep: true,
      handler: function () {
        this.currentPage = 1;
      },
    },
  },
  data() {
    return {
      grid: "coaDetail",
      settings: {
        columns,
        fields,
        rows,
        height,
        grouping,
      },
      file: {
        name: "",
      },
      param: {
        code: this.data.code ? this.data.code : "",
        lotNo: this.data.lot_no ? this.data.lot_no : "",
        request_name: this.data.request_name ? this.data.request_name : "",
      },
      isSelecting: false,
      currentPage: 1,
    };
  },
  methods: {
    async search(v) {
      if (_.isNumber(v)) {
        this.currentPage = v;
      }
      const data = await coadetail({
        ...this.param,
        currentPage: this.currentPage,
      });
      console.log(data);
    },
    reset() {},
    cancle() {},
    save() {},
    onFileChanged() {},
    upload() {},
    read() {},
  },
  mounted() {
    this.search();
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss">
.coa {
  .row {
    height: 75px;
  }
}
</style>
