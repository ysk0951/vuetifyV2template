<template>
  <div>
    <h3 class="mb-5">제조 기록지</h3>
    <v-form ref="form">
      <div class="wrapperSpace">
        <div style="width: 60%">
          <v-row class="pl-5 sch">
            <v-col cols="12" sm="4">
              <h4>Code Grade</h4>
              <v-text-field
                outlined
                dense
                placeholder="Code Grade를 입력해주세요"
                v-model="param.code"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <h4>Lot No</h4>
              <v-text-field
                outlined
                dense
                placeholder="Lot No를 입력해주세요"
                :rules="[this.validSet.commonCodeHipen]"
                v-model="param.lot_no"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <h4>요청자</h4>
              <div class="wrapperTop">
                <v-text-field
                  outlined
                  dense
                  placeholder="요청자를 입력해주세요"
                  :rules="[this.validSet.name]"
                  v-model="param.request_name"
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
    <div class="wrapperSpace pr-2 mt-16 mb-2">
      <h4>목록</h4>
      <v-btn
        depressed
        color="primary"
        @click="exelDownload"
        style="width: 145px"
        >엑셀 다운로드</v-btn
      >
    </div>
    <RealGrid
      :domName="grid"
      ref="grid"
      :settings="settings"
      @changePage="search"
      @dbClick="dbClick"
    />
  </div>
</template>
<script>
import RealGrid from "@/components/RealGrid.vue";
import validSet from "@/assets/valid";
import _ from "lodash";
import { searchproduce } from "api/sample/sample";
import { columns, fields, rows, height } from "@/assets/grid/report";
import { getExcel } from "api/file";
export default {
  data() {
    return {
      validSet,
      grid: "report",
      settings: {
        columns,
        fields,
        rows,
        height,
      },
      param: {
        lot_no: "",
        request_name: "",
        pageSize: 10,
        code: "",
      },
      items: [],
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
    valid() {
      return this.$refs.form.validate();
    },
    reset() {
      this.param = {
        lot_no: "",
        request_name: "",
        pageSize: 10,
        code: "",
      };
    },
    search(v) {
      if (this.valid()) {
        if (_.isNumber(v)) {
          this.currentPage = v;
        }
        searchproduce({
          currentPage: this.currentPage,
          ...this.param,
        }).then((res) => {
          const response = res.data;
          const items = response.data.items;
          this.items = items;
          const page = response.data.params;
          this.items = items;
          this.$refs.grid.loadData(items, [
            "delivery_date",
            "delivery_due_date",
            "request_date",
            "produce_due_date",
            "produce_date",
            "out_date",
            "out_due_date",
          ]);
          this.$refs.grid.setPage(page);
          if (items.length === 0) {
            this.settings.errorMessage = "진행중인 사항이 없습니다";
          }
        });
      }
    },
    exelDownload() {
      const data = this.$refs.grid.getCheckedRowExecl(this.settings.columns);
      if (data.length > 0) {
        getExcel(data, "제조기록지");
      } else {
        this.openPopup("엑셀 다운로드할 행을 선택해주세요");
      }
    },
    dbClick(data) {
      this.$emit(
        "dbClick",
        _.filter(this.items, (v) => v.lot_no === data.lot_no)[0]
      );
    },
  },
  mounted() {
    this.search();
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss"></style>
