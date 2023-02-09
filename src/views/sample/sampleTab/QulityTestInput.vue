<template>
  <div>
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
<style lang="scss"></style>
