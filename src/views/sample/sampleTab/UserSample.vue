<template>
  <div>
    <h3 class="mt-4 mb-2">회원 샘플 요청</h3>
    <hr class="mb-4" />
    <div class="wrapperSpace">
      <div>
        <h4 class="mt-4 mb-2">요청 내역</h4>
      </div>
      <div>
        <v-btn depressed color="primary" @click="newSample"
          >신규 샘플 요청</v-btn
        >
      </div>
    </div>
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
  </div>
</template>
<script>
import { columns, fields, rows } from "@/assets/grid/sampleRequest";
import RealGrid from "@/components/RealGrid.vue";

export default {
  data() {
    return {
      grid: "userSample",
      settings: {
        columns,
        fields,
        rows,
      },
    };
  },
  methods: {
    newSample() {
      console.log("newSample");
      this.$emit("newSample");
    },
  },
  components: {
    RealGrid,
  },
};
</script>
