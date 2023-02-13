<template>
  <div>
    <div class="service login">
      <SetPopup ref="confirm" />
      <RealGrid
        :domName="grid"
        ref="grid"
        :settings="settings"
        @changePage="loadData"
        @changeData="save"
      />
    </div>
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/langCode";
import RealGrid from "@/components/RealGrid.vue";
import { getMessageList } from "api/language";
import { mapState, mapMutations } from "vuex";
import { updateMessage } from "api/language";
import _ from "lodash";
import SetPopup from "@/components/SetPopup.vue";
export default {
  data() {
    return {
      origin: [],
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
        this.origin = items;
        this.$refs.grid.loadData(items);
        this.$refs.grid.setPage(page);
      });
    },
    reset() {},
    save(data) {
      const param = {
        idx: this.origin[data.dataRow].idx,
      };
      if (data.field === 2) {
        param.ko = data.newValue;
      } else {
        param.en = data.newValue;
      }
      updateMessage(param)
        .then(() => {})
        .catch((res) => {
          this.openPopup(`Error 관리자에게 문의하세요: ${res}`, false);
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
