<template>
  <div>
    <h3 class="mt-4 mb-2">샘플 요청 검수</h3>
    <hr class="mb-4" />
    <div class="confirmSample wrapperSpace py-1">
      <v-row>
        <v-col cols="12" sm="2">
          <h4>Lot Co</h4>
          <v-text-field
            outlined
            dense
            placeholder="Lot Co를 입력해주세요"
            v-model="param.lot_no"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
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
import { columns, fields, rows, height } from "@/assets/grid/confirmSearch";
import RealGrid from "@/components/RealGrid.vue";
import { sampleSearch } from "api/sample/sample";
export default {
  data() {
    return {
      grid: "confirmSample",
      settings: {
        columns,
        fields,
        rows,
        height,
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
  },
  methods: {
    loadData(v) {
      this.search(v);
    },
    dbClick(data) {
      this.$emit("confirmDetail", data);
    },
    newSample() {
      this.$emit("newSample");
    },
    search(v) {
      console.log(v);
      sampleSearch({ ...this.param, currentPage: 1 })
        .then((res) => {
          const response = res.data;
          const items = response.data.items;
          this.$refs.grid.loadData(items);
        })
        .catch(() => {});
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
