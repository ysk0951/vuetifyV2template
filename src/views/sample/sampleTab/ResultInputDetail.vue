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
import { resultsList } from "api/sample/sample";
import { columns, fields, rows, height } from "@/assets/grid/resultInputDetail";
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
    reset() {
      this.loadData();
    },
    save() {
      this.loadData();
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
