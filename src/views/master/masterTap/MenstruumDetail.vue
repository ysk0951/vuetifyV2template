<template>
  <div>
    <h3 class="mt-4 mb-2">용매조성 마스터 상세</h3>
    <hr class="mb-4" />
    <RealGrid
      :domName="grid"
      ref="grid"
      :settings="settings"
      :nonePage="true"
    />
    <div class="wrapper mt-4">
      <v-card-actions>
        <v-btn depressed @click="reset">취소</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="save">저장</v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script>
import * as menstrumm from "@/assets/grid/menstrumm";
import RealGrid from "@/components/RealGrid.vue";
import _ from "lodash";
import { solventMasterDetail, updateSolventMaster } from "api/solvent/solvent";
export default {
  props: ["data"],
  data() {
    return {
      grid: "menstrummDetail",
      settings: {
        ...menstrumm,
        columns: _.map(_.cloneDeep(menstrumm.columns), function (v) {
          console.log(v);
          if (v.key != "idx") {
            v.editable = true;
          }

          return v;
        }),
      },
    };
  },
  methods: {
    save() {
      updateSolventMaster(this.$refs.grid.getJsonRow())
        .then(() => {
          this.$emit("reload");
          this.reset();
        })
        .catch(() => {});
    },
    reset() {
      this.search();
    },
    search() {
      solventMasterDetail(this.data.idx).then((res) => {
        const response = res.data;
        const items = response.data;
        this.$refs.grid.loadData([items]);
        console.log(response);
      });
    },
  },
  mounted() {
    this.search();
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss"></style>
