<template>
  <div>
    <h3 class="mt-4 mb-2">용매조성 마스터 상세</h3>
    <hr class="mb-4" />
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
  </div>
</template>
<script>
import * as menstrumm from "@/assets/grid/menstrumm";
import RealGrid from "@/components/RealGrid.vue";
export default {
  data() {
    return {
      grid: "menstrummDetail",
      settings: menstrumm,
    };
  },
  methods: {
    newSample() {
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
.confirmSample {
  .v-text-field__details {
    display: none;
  }
}
</style>
