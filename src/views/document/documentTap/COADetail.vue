<template>
  <div class="coa">
    <SetPopup ref="confirm" />
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
          v-model="param.lotNo"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>수량(Qty)</h4>
        <v-text-field
          outlined
          dense
          disabled
          filled
          v-model="param.qty"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>제조일</h4>
        <v-text-field
          outlined
          dense
          disabled
          filled
          v-model="param.produce_date"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="px-2">
      <v-col cols="12" sm="3">
        <h4>납품처</h4>
        <v-text-field
          outlined
          dense
          disabled
          filled
          v-model="param.pickpart"
        ></v-text-field>
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
    <RealGrid
      :domName="grid"
      ref="grid"
      :settings="settings"
      :nonePage="true"
    />
    <h3 class="mt-16 mb-2">PDF 업로드</h3>
    <hr class="mb-4" />
    <div class="wrapper" style="width: 33%">
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
    </div>
    <v-row class="wrapper">
      <v-card-actions>
        <v-btn depressed @click="reset">취소</v-btn>
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
import { coadetail, coaPDFupload, coaUpdate } from "api/sample/sample";
import { mapMutations } from "vuex";
import { makeCOASpec } from "@/assets/grid/gridUtill";
import SetPopup from "@/components/SetPopup.vue";
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
        hideCheckBar: true,
        noneNo: true,
      },
      file: {
        name: this.data.coapdf_path
          ? this.data.coapdf_path.split("/").pop()
          : "",
      },
      fileBinary: "",
      param: {
        code: this.data.code ? this.data.code : "",
        lotNo: this.data.lotNo ? this.data.lotNo : "",
        request_name: this.data.request_name ? this.data.request_name : "",
        qty: this.data.qty ? this.data.qty : "",
        produce_date: this.data.produce_date ? this.data.produce_date : "",
        pickpart: this.data.pickpart ? this.pickpart : "",
        code_title: this.data.code_title ? this.data.code_title : "",
      },
      isSelecting: false,
      currentPage: 1,
    };
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP", "SET_POPUP_TEXT"]),
    ...mapMutations("menu", [
      "REMOVE_SELECT_MENU",
      "SET_SELECT_MENU_TAB_BY_CODE",
    ]),
    async search(v) {
      if (_.isNumber(v)) {
        this.currentPage = v;
      }
      const res = await coadetail({
        ...this.param,
        currentPage: this.currentPage,
      });
      const data = res.data.data;
      this.param.pickpart = data.pickpart;
      this.param.code_title = data.code_title;
      this.$refs.grid.loadData(data.items);
    },
    reset() {
      this.openPopup("취소하시겠습니까?", true, () => {
        this.file = {};
        this.fileBinary = "";
        this.$refs.uploader.value = null;
        this.search();
      });
    },
    openPopup(text, closable, cb) {
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
        text,
        closable,
      });
      this.$refs.confirm.openPopup(cb);
    },
    async save() {
      try {
        if (this.file.size) {
          const frm = new FormData();
          frm.append("lotNo", this.data.lotNo);
          frm.append("file", this.file);
          await coaPDFupload(frm);
        }
        const dt = this.$refs.grid.getJsonAllRow();
        const sampleDetail = makeCOASpec(dt, this.data.lotNo, this.data.code);
        await coaUpdate({
          lotNo: this.data.lotNo,
          results: sampleDetail,
        });
        this.openPopup(`저장되었습니다`, false, () => {
          this.REMOVE_SELECT_MENU("coaDetail");
          this.SET_SELECT_MENU_TAB_BY_CODE("COMGMT");
        });
      } catch (error) {
        this.openPopup(`관리자에게 문의하세요 :${error}`);
      }
    },
    onFileChanged(e) {
      const file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      this.file = file;
    },
    upload() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );
      this.$refs.uploader.click();
    },
    read() {},
  },
  mounted() {
    this.search();
  },
  components: {
    RealGrid,
    SetPopup,
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
