<template>
  <div>
    <div class="wrapperSpace mt-4">
      <v-row class="pl-2">
        <v-col cols="12" sm="2">
          <h4>Lot No</h4>
          <v-text-field
            outlined
            dense
            placeholder="Lot No를 입력해주세요"
            :rules="[this.validSet.commonCodeHipen]"
            v-model="param.lot_no"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <h4>요청자</h4>
          <v-text-field
            outlined
            dense
            placeholder="요청자를 입력해주세요"
            :rules="[this.validSet.name]"
            v-model="param.request_name"
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
    <div class="wrapperSpace">
      <div>
        <h4 class="mt-4 mb-2">목록</h4>
      </div>
    </div>
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/dailyReport";
import { searchproduce } from "api/sample/sample";
import RealGrid from "@/components/RealGrid.vue";
import validSet from "@/assets/valid";
import _ from "lodash";
export default {
  data() {
    return {
      grid: "delivaryReport",
      validSet,
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
      },
    };
  },
  methods: {
    newSample() {
      this.$emit("newSample");
    },
    search(v) {
      searchproduce({
        currentPage: _.isNumber(v) ? v : 1,
        ...this.param,
      }).then((res) => {
        const response = res.data;
        const items = response.data.items;
        const page = response.data.params;
        this.$refs.grid.loadData(items);
        this.$refs.grid.setPage(page);
      });
    },
    reset() {
      this.param = { lot_no: "", request_name: "", pageSize: 10 };
    },
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss"></style>
