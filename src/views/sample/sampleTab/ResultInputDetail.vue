<template>
  <div>
    <SetPopup ref="confirm" />
    <div class="wrapperSpace">
      <h4 class="mt-4 mb-2">품질검사 결과입력</h4>
      <!-- <div>
        <v-btn depressed @click="specAdd">추가</v-btn>
        <v-btn depressed color="primary" @click="specDel">삭제</v-btn>
      </div> -->
    </div>
    <RealGrid
      domName="resultInputDetail"
      ref="resultInputDetail"
      :settings="settings"
      :nonePage="true"
    />
    <div class="wrapper mt-3">
      <v-card-actions>
        <v-btn depressed @click="reset">초기화</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="save">저장</v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import RealGrid from "@/components/RealGrid.vue";
import SetPopup from "@/components/SetPopup.vue";
import { resultsList, resultsUpdate } from "api/sample/sample";
import { columns, fields, rows, height } from "@/assets/grid/resultInputDetail";
import { mapMutations } from "vuex";
import { makeARow } from "@/assets/grid/gridUtill";
export default {
  props: ["data"],
  data() {
    return {
      settings: {
        columns,
        fields,
        rows,
        height,
        errorMessage: "결과가 없습니다",
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
    openPopup(text, closable, cb) {
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
        text,
        closable,
      });
      this.$refs.confirm.openPopup(cb);
    },
    reset() {
      this.loadData();
    },
    save() {
      const rows = this.$refs.resultInputDetail.getJsonRows();
      _.each(rows, (v) => {
        v.lotNo = this.data.lotNo;
        v.code = this.data.code;
      });
      resultsUpdate(rows)
        .then(() => {
          this.REMOVE_SELECT_MENU("resultInputDetail");
          this.SET_SELECT_MENU_TAB_BY_CODE("RIMGMT");
        })
        .catch(() => {});
    },
    async loadData() {
      const res = await resultsList({
        lotNo: this.data.lotNo,
      });
      const item = res.data.data.items;
      _.each(item, (v) => {
        v.sub = v.hig - v.vol;
      });
      this.$refs.resultInputDetail.loadData(item);
    },
    specAdd() {
      const row = this.$refs.resultInputDetail.getJsonRows();
      const add = makeARow(this.settings.fields);
      this.$refs.resultInputDetail.loadData(row.concat(add));
    },
    specDel() {
      const row = this.$refs.resultInputDetail.getJsonRows();
      const idx = this.$refs.resultInputDetail.getCheckedRowIdx();
      if (idx.length < 1) {
        this.openPopup("삭제할 행을 선택해주세요", true);
      } else {
        this.openPopup("삭제하시겠습니까", true, () => {
          const ret = _.filter(row, (v, index) => {
            return !idx.includes(index);
          });
          this.$refs.resultInputDetail.loadData(ret);
        });
      }
    },
  },
  mounted() {
    this.loadData();
  },
  components: {
    RealGrid,
    SetPopup,
  },
};
</script>
<style lang="scss"></style>
