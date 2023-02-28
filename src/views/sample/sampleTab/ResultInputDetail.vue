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
    />
    <div class="wrapper">
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
import { columns, fields, rows, height } from "@/assets/grid/resultInputDetail";
import RealGrid from "@/components/RealGrid.vue";

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
      },
    };
  },
  methods: {
    reset() {},
    save() {
      this.loadData();
    },
    loadData() {},
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss"></style>
