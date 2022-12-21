<template>
  <div>
    <h3 class="mt-4 mb-2">회원 샘플 요청</h3>
    <hr class="mb-4" />
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
    />
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/sampleRequest";
import RealGrid from "@/components/RealGrid.vue";
import { memberSampleList } from "api/sample/sample";

export default {
  data() {
    return {
      grid: "userSample",
      settings: {
        columns,
        fields,
        rows,
        height,
      },
    };
  },
  methods: {
    newSample() {
      this.$emit("newSample");
    },
    loadData(v) {
      console.log(this.settings);
      memberSampleList({
        currentPage: v ? v : 1,
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
