<template>
  <div>
    <h3 class="mb-2">결과 입력</h3>
    <div class="wrapperSpace mt-4">
      <v-row class="pl-2">
        <v-col cols="12" sm="3">
          <h4>Code Grade</h4>
          <v-text-field
            outlined
            dense
            placeholder="Code Grade를 입력해주세요"
            v-model="param.code"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>Lot No</h4>
          <v-text-field
            outlined
            dense
            placeholder="Lot No를 입력해주세요"
            v-model="param.lot_no"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>요청자</h4>
          <v-text-field
            outlined
            dense
            placeholder="요청자를 입력해주세요"
            v-model="param.request_name"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <hr class="mt-3 mb-3" />
    <div class="wrapperEnd">
      <v-card-actions>
        <v-btn depressed @click="reset">초기화</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="search">검색</v-btn>
      </v-card-actions>
    </div>
    <div class="wrapperSpace">
      <div>
        <h4 class="mt-4 mb-2">목록</h4>
      </div>
    </div>
    <RealGrid
      :domName="grid"
      ref="grid"
      :settings="settings"
      @dbClick="dbClick"
      @changePage="search"
    />
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/resultInput";
import RealGrid from "@/components/RealGrid.vue";
import _ from "lodash";
import { searchproduce } from "api/sample/sample";
export default {
  data() {
    return {
      grid: "resultInput",
      settings: {
        columns,
        fields,
        rows,
        height,
        hideCheckBar: true,
      },
      param: {
        pageSize: 10,
        code: "",
        lot_no: "",
        request_name: "",
      },
      items: [],
    };
  },
  methods: {
    dbClick(data) {
      this.$emit(
        "dbClick",
        _.filter(this.items, (v) => v.lot_no === data.lot_no)[0]
      );
    },
    reset() {
      this.param = {};
    },
    loadData(v) {
      this.search(v);
    },
    search(v) {
      searchproduce({
        currentPage: _.isNumber(v) ? v : 1,
        ...this.param,
      }).then((res) => {
        const response = res.data;
        const items = response.data.items;
        const page = response.data.params;
        this.items = items;
        this.$refs.grid.loadData(items, ["created_at"]);
        this.$refs.grid.setPage(page);
        if (items.length === 0) {
          this.settings.errorMessage = "진행중인 사항이 없습니다";
        }
      });
    },
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss"></style>
