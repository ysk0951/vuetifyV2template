<template>
  <div>
    <div class="wrapperSpace">
      <div>
        <h4 class="mt-4 mb-2">목록</h4>
      </div>
    </div>
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/resultInputDetail";
import RealGrid from "@/components/RealGrid.vue";

export default {
  data() {
    return {
      grid: "resultInput",
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
