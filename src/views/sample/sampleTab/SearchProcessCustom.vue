<template>
  <div>
    <div class="wrapperSpace">
      <div>
        <h4 class="mt-4 mb-2">요청 내역</h4>
      </div>
    </div>
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
  </div>
</template>
<script>
import _ from "lodash";
import RealGrid from "@/components/RealGrid.vue";
import {
  columns,
  fields,
  rows,
  height,
} from "@/assets/grid/searchProcessCustom";
import { sampleRequestandstatus } from "api/sample/sample";
export default {
  data() {
    return {
      grid: "searchProcesCustom",
      settings: {
        columns,
        fields,
        rows,
        height,
        hideCheckBar: true,
        errorMessage: "진행중인 요청내역이 없습니다",
      },
      param: {
        pageSize: "10",
      },
    };
  },
  methods: {
    reset() {},
    search(v) {
      sampleRequestandstatus({
        ...this.param,
        currentPage: _.isNumber(v) ? v : 1,
      }).then((res) => {
        const response = res.data;
        const items = response.data.items;
        const page = response.data.params;
        this.$refs.grid.setPage(page);
        this.$refs.grid.loadData(items);
      });
    },
    loadData(v) {
      this.search(v);
    },
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss"></style>
