<template>
  <div>
    <div class="wrapperSpace">
      <div>
        <h4 class="mt-4 mb-2">품질검사 결과입력</h4>
      </div>
    </div>
    <RealGrid
      domName="resultInputDetail"
      ref="resultInputDetail"
      :settings="settings"
      :nonePage="true"
    />
    <div class="wrapper mt-3">
      <v-card-actions>
        <v-btn depressed @click="reset">초기화</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="save">저장</v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import RealGrid from "@/components/RealGrid.vue";
import { resultsList, resultsUpdate } from "api/sample/sample";
import { columns, fields, rows, height } from "@/assets/grid/resultInputDetail";
import { mapMutations } from "vuex";
export default {
  props: ["data"],
  data() {
    return {
      settings: {
        columns,
        fields,
        rows,
        height,
        errorMessage: "결과가 없습니다",
        noneNo: true,
        hideCheckBar: true,
      },
    };
  },
  methods: {
    ...mapMutations("menu", [
      "REMOVE_SELECT_MENU",
      "SET_SELECT_MENU_TAB_BY_CODE",
    ]),
    reset() {
      this.loadData();
    },
    save() {
      const rows = this.$refs.resultInputDetail.getJsonRows();
      _.each(rows, (v) => {
        v.lotNo = this.data.lotNo;
        v.code = this.data.code;
      });
      resultsUpdate(rows)
        .then(() => {
          this.REMOVE_SELECT_MENU("resultInputDetail");
          this.SET_SELECT_MENU_TAB_BY_CODE("RIMGMT");
        })
        .catch(() => {});
    },
    async loadData() {
      const res = await resultsList({
        lotNo: this.data.lotNo,
      });
      const item = res.data.data.items;
      _.each(item, (v) => {
        v.sub = v.hig - v.vol;
      });
      this.$refs.resultInputDetail.loadData(item);
    },
  },
  mounted() {
    this.loadData();
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss"></style>
