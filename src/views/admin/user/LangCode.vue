<template>
  <div>
    <div class="service login">
      <SetPopup ref="confirm" />
      <RealGrid
        :domName="grid"
        ref="grid"
        :settings="settings"
        @changePage="loadData"
      />
    </div>
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
import { columns, fields, rows, height } from "@/assets/grid/langCode";
import RealGrid from "@/components/RealGrid.vue";
import { getMessageList } from "api/language";
import { mapState, mapMutations } from "vuex";
// import { updateMessage } from "api/language";
import _ from "lodash";
import SetPopup from "@/components/SetPopup.vue";
export default {
  data() {
    return {
      settings: {
        columns: _.map(_.cloneDeep(columns), function (v) {
          if (v.key != "route" && v.key != "code") {
            v.editable = true;
          }
          return v;
        }),
        fields,
        rows,
        height,
        hideCheckBar: true,
      },
      grid: "lagnCode",
      currentPage: 1,
    };
  },
  computed: {
    ...mapState("select", ["workType", "roleType"]),
  },
  mounted() {
    this.search();
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP"]),
    loadData(v) {
      this.search(v);
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
    search(v) {
      getMessageList({
        currentPage: _.isNumber(v) ? v : 1,
        pageSize: 10,
      }).then((res) => {
        const response = res.data;
        const items = response.data.items;
        const page = response.data.params;
        this.$refs.grid.loadData(items);
        this.$refs.grid.setPage(page);
      });
    },
    reset() {},
    save() {
      this.openPopup("저장하시겠습니까?", true, () => {
        // eslint-disable-next-line no-unused-vars
        const rows = this.$refs.grid.getRow();
        // updateMessage(this.param)
        //   .then(() => {
        //     this.openPopup("저장되었습니다", false, () => {
        //       this.setData();
        //     });
        //   })
        //   .catch((res) => {
        //     this.openPopup(res, false);
        //   });
      });
    },
  },
  components: {
    RealGrid,
    SetPopup,
  },
};
</script>
<style>
.login .v-input__slot {
  width: 100% !important;
}
</style>
