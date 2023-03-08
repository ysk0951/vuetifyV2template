<template>
  <div>
    <h3 class="mb-2">COA 관리</h3>
    <SetPopup ref="confirm" />
    <v-form lazy-validation ref="form">
      <div style="width: 80%">
        <div class="wrapperSpace pa-4 sch">
          <v-row class="pl-2">
            <v-col cols="12" sm="4">
              <h4>Lot No</h4>
              <v-text-field
                outlined
                dense
                placeholder="Lot No를 입력해 주세요."
                v-model="input.lot_no"
                :rules="[this.validSet.commonCodeHipen]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <h4>샘플코드</h4>
              <v-text-field
                outlined
                dense
                placeholder="샘플코드를 입력해 주세요."
                v-model="input.sampleCode"
                :rules="[this.validSet.commonCodeHipen]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <h4>요청자</h4>
              <div class="wrapperTop">
                <v-text-field
                  outlined
                  dense
                  placeholder="요청자를 입력해 주세요."
                  v-model="input.request_name"
                  :rules="[this.validSet.name]"
                ></v-text-field>
                <v-card-actions>
                  <v-btn depressed @click="reset">초기화</v-btn>
                </v-card-actions>
                <v-card-actions>
                  <v-btn depressed color="primary" @click="search">검색</v-btn>
                </v-card-actions>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-form>
    <div class="wrapperSpace pr-2">
      <div>
        <h4 class="mt-4 mb-2">목록</h4>
      </div>
      <v-btn
        depressed
        color="primary"
        @click="exelDownload"
        style="width: 143px"
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
import SetPopup from "@/components/SetPopup.vue";
import { columns, fields, rows, height } from "@/assets/grid/coa";
import { sampleSearch } from "api/sample/sample";
import { getExcel } from "api/file";
import _ from "lodash";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      validSet,
      grid: "cda",
      input: {
        lot_no: "",
        sampleCode: "",
        request_name: "",
        pageSize: 10,
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
  watch: {
    param: {
      deep: true,
      handler: function () {
        this.currentPage = 1;
      },
    },
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP"]),
    valid() {
      return this.$refs.form.validate();
    },
    exelDownload() {
      const data = this.$refs.grid.getCheckedRowExecl(this.settings.columns);
      if (data.length > 0) {
        getExcel(data, "coa");
      } else {
        this.openPopup("엑셀 다운로드할 행을 선택해주세요");
      }
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
    async search(v) {
      if (this.valid()) {
        if (_.isNumber(v)) {
          this.currentPage = v;
        }
        const res = await sampleSearch({
          ...this.input,
          currentPage: this.currentPage,
        });
        const response = res.data;
        const items = response.data.items;
        const page = response.data.params;
        this.$refs.grid.loadData(items, ["created_at"]);
        this.$refs.grid.setPage(page);
      }
    },
    reset() {},
    loadData(v) {
      this.search(v);
    },
    dbClick(data) {
      this.$emit("dbClick", data);
    },
  },
  mounted() {
    this.loadData();
  },
  components: {
    RealGrid,
    SetPopup,
  },
};
</script>
<style lang="scss"></style>
