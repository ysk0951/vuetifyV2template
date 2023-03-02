<template>
  <div>
    <h3 class="mb-2">진행사항 조회</h3>
    <v-form lazy-validation ref="form">
      <div class="searchProcess wrapperSpace pr-2 mt-4">
        <v-row class="pl-2" style="height: 86px">
          <v-col cols="12" sm="3">
            <h4>Lot No</h4>
            <v-text-field
              outlined
              dense
              placeholder="Lot No를 입력해 주세요."
              v-model="param.lotNo"
              :rules="[this.validSet.commonCodeHipen]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <h4>요청자</h4>
            <v-text-field
              outlined
              dense
              placeholder="요청자를 입력해 주세요."
              v-model="param.request_name"
              :rules="[this.validSet.name]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>접수 상태</h4>
            <v-select :items="code.Q" v-model="param.stat" outlined id="work" />
          </v-col>
          <v-col cols="12" sm="2">
            <h4>제조 진행사항</h4>
            <v-select
              :items="code.R"
              v-model="param.producestat"
              outlined
              id="work"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <h4>출하 사항</h4>
            <v-select
              :items="code.O"
              v-model="param.releasestat"
              outlined
              id="work"
            />
          </v-col>
        </v-row>
      </div>
      <div class="wrapperEnd">
        <v-card-actions>
          <v-btn depressed @click="reset">초기화</v-btn>
        </v-card-actions>
        <v-card-actions class="px-0">
          <v-btn depressed color="primary" @click="search">검색</v-btn>
        </v-card-actions>
      </div>
      <div class="wrapperSpace">
        <div>
          <h4 class="mt-4 mb-2">요청 내역</h4>
        </div>
      </div>
    </v-form>
    <RealGrid
      :domName="grid"
      ref="grid"
      :settings="settings"
      @changePage="search"
    />
  </div>
</template>
<script>
import {
  columns,
  fields,
  rows,
  height,
} from "@/assets/grid/searchProcessCustom";
import { mapState } from "vuex";
import { sampleRequestandstatusadmin } from "api/sample/sample";
import RealGrid from "@/components/RealGrid.vue";
import validSet from "@/assets/valid";
import _ from "lodash";

export default {
  data() {
    return {
      grid: "searchProces",
      validSet,
      settings: {
        columns,
        fields,
        rows,
        height,
        hideCheckBar: true,
        errorMessage: "진행중인 요청내역이 없습니다",
      },
      param: {
        currentPage: "1",
        lotNo: "",
        pageSize: "10",
        producestat: "전체",
        releasestat: "전체",
        request_name: "",
        stat: "전체",
      },
    };
  },
  methods: {
    reset() {
      this.param = {
        currentPage: "1",
        lotNo: "",
        pageSize: "10",
        producestat: "전체",
        releasestat: "전체",
        request_name: "",
        stat: "전체",
      };
    },
    loadData(v) {
      this.search(v);
    },
    search(v) {
      if (this.valid()) {
        sampleRequestandstatusadmin({
          ...this.param,
          currentPage: _.isNumber(v) ? v : 1,
        }).then((res) => {
          const response = res.data;
          const items = response.data.items;
          const page = response.data.params;
          this.$refs.grid.setPage(page);
          this.$refs.grid.loadData(items);
        });
      }
    },
    valid() {
      return this.$refs.form.validate();
    },
  },
  components: {
    RealGrid,
  },
  computed: {
    ...mapState("common", ["code"]),
  },
  mounted() {
    this.loadData();
  },
};
</script>
<style lang="scss">
.searchProcess {
  .v-input__slot {
    width: 100% !important;
  }
}
</style>
