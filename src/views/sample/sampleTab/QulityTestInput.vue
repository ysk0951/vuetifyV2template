<template>
  <div>
    <h3 class="mt-4 mb-2">품질검사 결과입력</h3>
    <hr class="mb-4" />
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
    <div class="wrapper">
      <v-card-actions>
        <v-btn depressed @click="reset">초기화</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="search">저장</v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/sampleRequest";
import RealGrid from "@/components/RealGrid.vue";

export default {
  data() {
    return {
      grid: "qulityTestInput",
      settings: {
        columns,
        fields,
        rows,
        height,
      },
    };
  },
  methods: {
    newSample() {
      console.log("newSample");
      this.$emit("newSample");
    },
    reset() {},
    search() {},
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss">
.searchProcess {
  .v-input__slot {
    width: 100% !important;
  }
  .v-text-field__details {
    display: none;
  }
}
</style>
