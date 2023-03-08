<template>
  <div>
    <h3 class="mb-2">샘플요청 검수</h3>
    <v-form ref="form" lazy-validation>
      <div class="wrapperSpace py-1 mt-4">
        <div class="sch" style="width: 50%">
          <v-row class="px-4 py-2">
            <v-col cols="12" sm="6">
              <h4>Lot No</h4>
              <v-text-field
                outlined
                dense
                placeholder="Lot No를 입력해 주세요."
                v-model="param.lot_no"
                :rules="[this.validSet.commonCodeHipen]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <h4>요청자</h4>
              <div class="wrapperEnd">
                <v-text-field
                  outlined
                  dense
                  placeholder="요청자를 입력해 주세요."
                  v-model="param.request_name"
                  :rules="[this.validSet.name]"
                ></v-text-field>
                <div class="wrapperTop">
                  <v-card-actions>
                    <v-btn depressed @click="reset">초기화</v-btn>
                  </v-card-actions>
                  <v-card-actions class="px-0">
                    <v-btn depressed color="primary" @click="search"
                      >검색</v-btn
                    >
                  </v-card-actions>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-form>
    <hr class="mb-3" />
    <div class="wrapperSpace">
      <div>
        <h4 class="mt-4 mb-2">요청 내역</h4>
      </div>
    </div>
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
import _ from "lodash";
import RealGrid from "@/components/RealGrid.vue";
import validSet from "@/assets/valid";
import { sampleSearch } from "api/sample/sample";
import { columns, fields, rows, height } from "@/assets/grid/confirmSearch";
export default {
  data() {
    return {
      grid: "confirmSample",
      validSet,
      settings: {
        columns,
        fields,
        rows,
        height,
        hideCheckBar: true,
        errorMessage: "샘플 요청 내역이 없습니다",
      },
      param: {
        request_name: "",
        lot_no: "",
        pageSize: 10,
      },
    };
  },
  mounted() {
    this.reset();
    this.loadData();
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
    loadData(v) {
      this.search(v);
    },
    dbClick(data) {
      this.$emit("confirmDetail", data);
    },
    valid() {
      return this.$refs.form.validate();
    },
    search(v) {
      if (this.valid()) {
        if (_.isNumber(v)) {
          this.currentPage = v;
        }
        sampleSearch({
          ...this.param,
          currentPage: this.currentPage,
          stat: 0,
        })
          .then((res) => {
            const response = res.data;
            const items = response.data.items;
            const page = response.data.params;
            this.$refs.grid.setPage(page);
            this.$refs.grid.loadData(items, ["created_at"]);
          })
          .catch(() => {});
      }
    },
    reset() {
      this.param = {
        request_name: "",
        lot_no: "",
        currentPage: 1,
        pageSize: 10,
      };
    },
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss">
.confirmSample {
  .v-text-field__details {
    display: none;
  }
}
</style>
