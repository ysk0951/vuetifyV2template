<template>
  <div class="material">
    <h3 class="mt-4 mb-2">물질명 INDEX 상세</h3>
    <hr class="mb-4" />
    <RealGrid
      :domName="grid"
      ref="grid"
      :settings="settings"
      :nonePage="true"
    />
    <div class="wrapper mt-4">
      <v-card-actions>
        <v-btn depressed @click="cancle">취소</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="save">저장</v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script>
import { columns, fields, height } from "@/assets/grid/materialIndex";
import { subsMasterDetail, updateSubsMaster } from "api/subIndex/subIndex";

import { mapState } from "vuex";
import _ from "lodash";
import RealGrid from "@/components/RealGrid.vue";
export default {
  props: ["data"],
  data() {
    return {
      grid: "materialIndexDetail",
      settings: {
        columns: _.map(_.cloneDeep(columns), function (v) {
          v.editable = true;
          return v;
        }),
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
    save() {
      updateSubsMaster({ ...this.$refs.grid.getJsonRow() })
        .then(() => {
          this.reset();
        })
        .catch(() => {});
    },
    reset() {
      this.loadData();
    },
    loadData() {
      subsMasterDetail(this.data.rmav)
        .then((res) => {
          const response = res.data;
          const items = response.data;
          this.$refs.grid.loadData([items]);
        })
        .catch(() => {});
    },
  },
  components: {
    RealGrid,
  },
  mounted() {
    this.loadData();
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
