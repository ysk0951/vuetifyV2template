<template>
  <div>
    <div class="wrapperSpace">
      <v-row class="pl-2">
        <v-col cols="12" sm="3">
          <h4>Code Grade</h4>
          <v-text-field
            outlined
            dense
            placeholder="Code Grade를 입력해주세요"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>Lot No</h4>
          <v-text-field
            outlined
            dense
            placeholder="Lot No를 입력해주세요"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>요청자</h4>
          <v-text-field
            outlined
            dense
            placeholder="요청자를 입력해주세요"
          ></v-text-field>
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
    <div class="wrapperSpace pr-2">
      <div>
        <h4 class="mt-4 mb-2">목록</h4>
      </div>
      <v-btn
        depressed
        color="primary"
        @click="exelDownload"
        style="width: 145px"
        >엑셀 다운로드</v-btn
      >
    </div>
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/sampleRequest";
import RealGrid from "@/components/RealGrid.vue";
import { getExcel } from "api/file";
export default {
  data() {
    return {
      grid: "report",
      settings: {
        columns,
        fields,
        rows,
        height,
      },
    };
  },
  methods: {
    newSample() {
      this.$emit("newSample");
    },
    reset() {},
    search() {},
    exelDownload() {
      const data = this.$refs.grid.getCheckedRow();
      if (data.length > 0) {
        getExcel(data, "coa");
      } else {
        this.openPopup("엑셀 다운로드할 행을 선택해주세요");
      }
    },
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss"></style>
