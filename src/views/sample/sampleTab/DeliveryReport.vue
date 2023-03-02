<template>
  <div>
    <h3 class="mb-2">납품일보</h3>
    <SetPopup ref="confirm" />
    <v-form ref="form" lazy-validation>
      <div class="wrapperSpace mt-4">
        <v-row class="px-2">
          <v-col cols="12" sm="2">
            <h4>Lot No</h4>
            <v-text-field
              outlined
              dense
              placeholder="Lot No를 입력해 주세요."
              :rules="[this.validSet.commonCodeHipen]"
              v-model="param.lot_no"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>요청자</h4>
            <v-text-field
              outlined
              dense
              placeholder="요청자를 입력해 주세요."
              :rules="[this.validSet.name]"
              v-model="param.request_name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>요청자재코드</h4>
            <v-text-field
              outlined
              dense
              placeholder="요청자재코드를 입력해 주세요"
              v-model="param.request_code"
              v-mask="`###/###/###`"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>요청업체명</h4>
            <v-text-field
              outlined
              dense
              placeholder="요청업체명을 입력해 주세요"
              v-model="param.request_company"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>제조예정일</h4>
            <v-menu
              v-model="picker1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="param.produce_due_date"
                  placeholder="제조예정일"
                  append-icon="mdi-calendar"
                  outlined
                  dense
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                @input="menu = false"
                v-model="param.produce_due_date"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>납품에정일</h4>
            <v-menu
              v-model="picker2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="param.derivery_due_date"
                  placeholder="납품에정일을 입력해주세요"
                  append-icon="mdi-calendar"
                  outlined
                  dense
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                @input="menu = false"
                v-model="param.derivery_due_date"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </div>
      <hr class="mb-3" />
      <div class="wrapperEnd mb-3">
        <v-card-actions>
          <v-btn depressed @click="reset">초기화</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn depressed color="primary" @click="search">검색</v-btn>
        </v-card-actions>
      </div>
      <div class="wrapperSpace px-2">
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
      <RealGrid
        :domName="grid"
        ref="grid"
        :settings="settings"
        @changePage="loadData"
        @dbClick="dbClick"
      />
    </v-form>
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/dailyReport";
import { searchproduce } from "api/sample/sample";
import { getExcel } from "api/file";
import { mapMutations } from "vuex";
import SetPopup from "@/components/SetPopup.vue";
import RealGrid from "@/components/RealGrid.vue";
import validSet from "@/assets/valid";
import _ from "lodash";
export default {
  data() {
    return {
      picker1: false,
      picker2: false,
      grid: "delivaryReport",
      validSet,
      items: [],
      settings: {
        columns,
        fields,
        rows,
        height,
        errorMessage: "요청된 내역이 없습니다",
        noneNo: true,
        //
      },
      param: {
        lot_no: "",
        request_name: "",
        pageSize: 10,
        request_code: "",
        request_company: "",
        produce_due_date: "",
        derivery_due_date: "",
      },
    };
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP"]),
    valid() {
      return this.$refs.form.validate();
    },
    exelDownload() {
      const data = this.$refs.grid.getCheckedRow();
      if (data.length > 0) {
        getExcel(data, "납품일보");
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
    loadData(v) {
      this.search(v);
    },
    search(v) {
      if (this.valid()) {
        searchproduce({
          currentPage: _.isNumber(v) ? v : 1,
          ...this.param,
        }).then((res) => {
          const response = res.data;
          const items = response.data.items;
          const page = response.data.params;
          this.items = items;
          this.$refs.grid.loadData(items, [
            "derivery_date",
            "derivery_due_date",
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
    reset() {
      this.param = {
        lot_no: "",
        request_name: "",
        pageSize: 10,
        request_code: "",
        request_company: "",
        produce_due_date: "",
        derivery_due_date: "",
      };
      this.items = [];
    },
    dbClick(data) {
      this.$emit(
        "dbClick",
        _.filter(this.items, (v) => v.lotNo === data.lotNo)[0]
      );
    },
  },
  components: {
    RealGrid,
    SetPopup,
  },
  mounted() {
    this.loadData();
  },
};
</script>
<style lang="scss"></style>
