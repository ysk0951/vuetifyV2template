<template>
  <div>
    <h3 class="mt-4 mb-2">다국어 지원 관리</h3>
    <hr class="mb-4" />
    <div class="service login">
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
import { mapState } from "vuex";
import _ from "lodash";
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
    loadData(v) {
      this.search(v);
    },
    search(v) {
      getMessageList({
        currentPage: _.isNumber(v) ? v : 1,
        pageSize: 3,
      }).then((res) => {
        const response = res.data;
        const items = response.data.items;
        const page = response.data.params;
        this.$refs.grid.loadData(items);
        this.$refs.grid.setPage(page);
      });
    },
    reset() {},
    save() {},
  },
  components: {
    RealGrid,
  },
};
</script>
<style>
.login .v-input__slot {
  width: 100% !important;
}
</style>
