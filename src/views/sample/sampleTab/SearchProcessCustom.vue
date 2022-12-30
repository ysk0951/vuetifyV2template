<template>
  <div>
    <h3 class="mt-4 mb-2">진행사항 조회</h3>
    <hr class="mb-4" />
    <div class="wrapperSpace">
      <div>
        <h4 class="mt-4 mb-2">요청 내역</h4>
      </div>
    </div>
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/sampleRequest";
import RealGrid from "@/components/RealGrid.vue";

export default {
  data() {
    return {
      grid: "searchProcesCustom",
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
