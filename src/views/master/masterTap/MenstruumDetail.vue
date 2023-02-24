<template>
  <div>
    <SetPopup ref="confirm" />
    <RealGrid
      :domName="grid"
      ref="grid"
      :settings="settings"
      :nonePage="true"
      @changeData="changeData"
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
import { setNewSum } from "@/assets/grid/gridUtill";
import { mapMutations } from "vuex";
import { updateSolventMaster } from "api/solvent/solvent";
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
        hideCheckBar: true,
        noneNo: true,
      },
    };
  },
  methods: {
    ...mapMutations("menu", [
      "REMOVE_SELECT_MENU",
      "SET_SELECT_MENU_TAB_BY_CODE",
    ]),
    ...mapMutations("popup", ["SET_POPUP"]),
    changeData() {
      const row = this.$refs.grid.getJsonRow();
      this.setSumRow(row);
    },
    setSumRow(row) {
      const sum = [setNewSum(row)];
      this.$refs.grid.loadData(sum);
    },
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
            this.openPopup("저장되었습니다", false, () => {});
          })
          .catch(() => {});
      });
    },
    reset() {
      this.openPopup("취소하시겠습니까?", true, () => {
        this.REMOVE_SELECT_MENU("menstruumDetail");
        this.SET_SELECT_MENU_TAB_BY_CODE("SAMGMT");
      });
    },
  },
  mounted() {
    this.setSumRow(this.data);
  },
  components: {
    RealGrid,
    SetPopup,
  },
};
</script>
<style lang="scss"></style>
