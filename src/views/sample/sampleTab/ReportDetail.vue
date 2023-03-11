<template>
  <div class="reportDetail">
    <SetPopup ref="confirm" />
    <v-row class="px-2">
      <v-col cols="12" sm="2">
        <h4>Lot No</h4>
        <v-text-field
          outlined
          dense
          disabled
          filled
          v-model="param.lotNo"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>Code Grade</h4>
        <v-text-field
          outlined
          dense
          disabled
          filled
          v-model="param.code"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>수량(Qty)</h4>
        <v-text-field
          outlined
          dense
          disabled
          filled
          v-model="param.qty"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>출하예정일</h4>
        <v-text-field
          outlined
          dense
          disabled
          filled
          v-model="param.out_due_date"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>요청처</h4>
        <v-text-field
          outlined
          dense
          disabled
          filled
          v-model="param.request_company"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>요청인</h4>
        <v-text-field
          outlined
          dense
          disabled
          filled
          v-model="param.request_name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="px-2">
      <v-col cols="12" sm="12">
        <h4>조성</h4>
        <v-text-field
          outlined
          dense
          disabled
          filled
          v-model="param.code_title"
        ></v-text-field>
      </v-col>
    </v-row>
    <h3 class="mt-4 mb-2">세부정보</h3>
    <hr class="mb-8" />
    <RealGrid
      :domName="grid"
      ref="reportDetailGrid"
      :settings="settings"
      :nonePage="true"
      class="mb-10"
      @changeData="changeData"
    />
    <v-row style="height: 90px" class="px-2">
      <v-col cols="12" sm="3">
        <h4>포장 용기</h4>
        <v-select
          :items="this.rmAll(code.C)"
          v-model="param.packing"
          placeholder="선택해주세요"
          outlined
          id="work"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>라벨기재사항</h4>
        <v-text-field
          outlined
          dense
          v-model="param.request_code"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>배송방법</h4>
        <v-select
          :items="this.rmAll(code.D)"
          v-model="param.delivery_type"
          placeholder="선택해주세요"
          outlined
          id="work"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>분석 특이사항</h4>
        <v-text-field outlined dense v-model="param.analysis"></v-text-field>
      </v-col>
    </v-row>
    <v-row style="height: 90px" class="px-2">
      <v-col cols="12" sm="3">
        <h4>고객요청 특이사항</h4>
        <v-text-field
          outlined
          dense
          class="pr-2"
          v-model="param.request_etc"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>제조상 특이사항</h4>
        <v-text-field outlined dense v-model="param.produce_etc"></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>포장 및 배송관련 특이사항</h4>
        <v-text-field
          outlined
          dense
          v-model="param.delivery_etc"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row style="height: 90px" class="px-2"> </v-row>
    <div class="wrapper">
      <v-card-actions>
        <v-btn depressed @click="reset">취소</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="save">완료 </v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script>
import RealGrid from "@/components/RealGrid.vue";
import SetPopup from "@/components/SetPopup.vue";
import _ from "lodash";
import { mapState, mapMutations } from "vuex";
import { produceReportDetail, produceReportUpdate } from "api/sample/sample";
import * as settings from "@/assets/grid/reportDetail";
export default {
  props: ["data"],
  data() {
    return {
      grid: "reportDetail",
      param: {
        lotNo: this.data.lotNo,
        code: this.data.code,
        qty: this.data.qty,
        out_due_date: this.data.out_due_date,
        request_company: this.data.request_company,
        request_name: this.data.request_name,
        code_title: "",
        delivery_type: "",
        analysis: "",
        delivery_etc: "",
        produce_etc: "",
        request_etc: "",
        detail: [],
        packing: "",
        request_code: "",
        sum_qty: "",
        sum_vol: "",
        sum_vol2: "",
      },
      settings,
    };
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP", "SET_POPUP_TEXT"]),
    ...mapMutations("menu", [
      "REMOVE_SELECT_MENU",
      "SET_SELECT_MENU_TAB_BY_CODE",
    ]),
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
    reset() {
      this.openPopup("취소하시겠습니까?", true, () => {
        this.search();
      });
    },
    save() {
      if (this.param.sum_vol > 100 || this.param.sum_vol2 > 100) {
        this.openPopup("합계가 100이 넘습니다");
      } else {
        this.openPopup("저장하시겠습니까?", true, () => {
          produceReportUpdate(this.param)
            .then(() => {
              this.openPopup("저장되었습니다", false, () => {
                this.REMOVE_SELECT_MENU("reportDetail");
                this.SET_SELECT_MENU_TAB_BY_CODE("RMGMT");
              });
            })
            .catch(() => {
              this.openPopup("저장중 오류발생 : 관리자에게 문의하세요");
            });
        });
      }
    },
    search() {
      produceReportDetail(this.param)
        .then((res) => {
          const response = res.data.data;
          if (response) {
            console.log(response);
            this.param.code_title = response.code_title;
            this.param.detail = response.items;
            this.param.delivery_type = response.delivery_type;
            this.param.request_code = response.request_code;
            this.param.packing = response.packing;
            this.param.analysis = response.analysis
              ? response.analysis
              : "특이사항 없음";
            this.param.delivery_etc = response.delivery_etc
              ? response.delivery_etc
              : "특이사항 없음";
            this.param.produce_etc = response.produce_etc
              ? response.produce_etc
              : "특이사항 없음";
            this.param.request_etc = response.request_etc
              ? response.request_etc
              : "특이사항 없음";
            this.param.sum_qty = response.sum_qty;
            this.param.sum_vol = response.sum_vol;
            this.param.sum_vol2 = response.sum_vol2;
            response.items.push({
              spec: "SUM",
              vol: response.sum_vol,
              vol2: response.sum_vol2,
              qty: response.sum_qty,
            });
            this.$refs.reportDetailGrid.loadData(response.items);
          }
        })
        .catch(() => {
          this.openPopup("오류발생 : 관리자에게 문의하세요");
        });
    },
    getSum(row, col) {
      return _.reduce(
        row,
        (a, v) => {
          a += Number(v[col]);
          return a;
        },
        0
      ).toFixed(2);
    },
    changeData() {
      const row = this.$refs.reportDetailGrid.getJsonRows();
      if (row.length > 0) {
        row.pop();
        this.param.detail = row;
        this.param.sum_vol = this.getSum(row, "vol");
        this.param.sum_vol2 = this.getSum(row, "vol2");
        this.param.sum_qty = this.getSum(row, "qty");
        row.push({
          spec: "SUM",
          vol: this.param.sum_vol,
          vol2: this.param.sum_vol2,
          qty: this.param.sum_qty,
        });
        this.$refs.reportDetailGrid.loadData(row);
      }
    },
  },
  components: {
    RealGrid,
    SetPopup,
  },
  computed: {
    ...mapState("common", ["code"]),
  },
  mounted() {
    this.search();
  },
};
</script>
<style lang="scss">
.reportDetail {
  .v-input__slot {
    width: 100%;
  }
}
</style>
