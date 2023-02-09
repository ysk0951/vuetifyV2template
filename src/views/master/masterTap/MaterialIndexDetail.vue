<template>
  <div class="material">
    <SetPopup ref="confirm" />
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
import { mapState, mapMutations } from "vuex";
import _ from "lodash";
import RealGrid from "@/components/RealGrid.vue";
import SetPopup from "@/components/SetPopup.vue";
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
        updateSubsMaster({ ...this.$refs.grid.getJsonRow() })
          .then(() => {
            this.openPopup("저장되었습니다", false, () => {
              this.reset();
            });
          })
          .catch(() => {});
      });
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
    SetPopup,
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
