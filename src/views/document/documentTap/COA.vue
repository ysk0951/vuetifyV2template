<template>
  <div class="coa">
    <h3 class="mt-4 mb-2">COA 상세</h3>
    <hr class="mb-4" />
    <h3 class="mt-6 mb-2">기본정보</h3>
    <hr class="mb-4" />
    <v-row>
      <v-col cols="12" sm="3">
        <h4>Code Grade</h4>
        <v-text-field outlined dense></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>Lot No</h4>
        <v-text-field outlined dense></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>수량(Qty)</h4>
        <v-text-field outlined dense></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>제조일</h4>
        <v-text-field outlined dense></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="3">
        <h4>납품처</h4>
        <v-text-field outlined dense></v-text-field>
      </v-col>
      <v-col cols="12" sm="9">
        <h4>품명</h4>
        <v-text-field outlined dense></v-text-field>
      </v-col>
    </v-row>
    <h3 class="mt-16 mb-2">상세정보</h3>
    <hr class="mb-4" />
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
  </div>
</template>
<script>
import { columns, fields, rows, height, grouping } from "@/assets/grid/coa";
import RealGrid from "@/components/RealGrid.vue";

export default {
  data() {
    return {
      grid: "coa",
      settings: {
        columns,
        fields,
        rows,
        height,
        grouping,
      },
    };
  },
  methods: {
    newSample() {
      console.log("newSample");
      this.$emit("newSample");
    },
    search() {},
    reset() {},
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss">
.coa {
  .row {
    height: 75px;
  }
}
</style>
