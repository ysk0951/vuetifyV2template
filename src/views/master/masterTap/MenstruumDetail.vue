<template>
  <div>
    <SetPopup ref="confirm" />
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
import SetPopup from "@/components/SetPopup.vue";
import { mapMutations } from "vuex";
import { solventMasterDetail, updateSolventMaster } from "api/solvent/solvent";
export default {
  props: ["data"],
  data() {
    return {
      grid: "menstrummDetail",
      settings: {
        ...menstrumm,
        columns: _.map(_.cloneDeep(menstrumm.columns), function (v) {
          if (v.key != "idx") {
            v.editable = true;
          }
          return v;
        }),
      },
    };
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP"]),
    openPopup(text, closable, cb) {
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
        closable,
        text,
      });
      this.$refs.confirm.openPopup(cb);
    },
    save() {
      this.openPopup("저장하시겠습니까?", true, () => {
        updateSolventMaster(this.$refs.grid.getJsonRow())
          .then(() => {
            this.openPopup("저장되었습니다", false, () => {
              this.reset();
            });
          })
          .catch(() => {});
      });
    },
    reset() {
      this.search();
    },
    search() {
      solventMasterDetail(this.data.idx).then((res) => {
        const response = res.data;
        const items = response.data;
        this.$refs.grid.loadData([items]);
      });
    },
  },
  mounted() {
    this.search();
  },
  components: {
    RealGrid,
    SetPopup,
  },
};
</script>
<style lang="scss"></style>
