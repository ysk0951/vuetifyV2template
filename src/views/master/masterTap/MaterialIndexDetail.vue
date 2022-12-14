<template>
  <div class="material">
    <h3 class="mt-4 mb-2">물질명 INDEX 상세</h3>
    <hr class="mb-4" />
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
  </div>
</template>
<script>
import { columns, fields, height } from "@/assets/grid/materialIndex";
import RealGrid from "@/components/RealGrid.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      grid: "materialIndexDetail",
      settings: {
        columns,
        fields,
        height,
      },
      material: "",
    };
  },
  computed: {
    ...mapState("common", ["code"]),
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
.material {
  .v-input__slot {
    width: 200px;
  }
}
</style>
