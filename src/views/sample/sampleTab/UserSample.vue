<template>
  <div>
    <div class="wrapperSpace">
      <div>
        <h4 class="mt-4 mb-2">요청 내역</h4>
      </div>
      <div>
        <v-btn depressed color="primary" @click="newSample">샘플 요청</v-btn>
      </div>
    </div>
    <RealGrid
      :domName="grid"
      ref="grid"
      :settings="settings"
      @changePage="loadData"
      @dbClick="dbClick"
    />
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/sampleRequest";
import RealGrid from "@/components/RealGrid.vue";
import { memberSampleList } from "api/sample/sample";
import _ from "lodash";

export default {
  data() {
    return {
      grid: "userSample",
      settings: {
        columns,
        fields,
        rows,
        height,
        hideCheckBar: true,
        errorMessage: "요청한 샘플이 없습니다",
      },
    };
  },
  methods: {
    newSample() {
      this.$emit("newSample");
    },
    dbClick() {
      this.$emit("dbClick");
    },
    loadData(v) {
      memberSampleList({
        currentPage: _.isNumber(v) ? v : 1,
        memberId: "yskimweb@gmail.com",
        pageSize: "10",
      })
        .then((res) => {
          const response = res.data;
          const items = response.data.items;
          const page = response.data.params;
          this.$refs.grid.loadData(items);
          this.$refs.grid.setPage(page);
        })
        .catch((res) => {
          console.error(res);
        });
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
