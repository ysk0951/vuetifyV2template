<template>
  <div>
    <h3 class="mt-4 mb-2">진행사항 조회</h3>
    <hr class="mb-4" />
    <div class="searchProcess wrapperSpace pr-2">
      <v-row>
        <v-col cols="12" sm="3">
          <h4>Lot Co</h4>
          <v-text-field
            outlined
            dense
            placeholder="Lot Co를 입력해주세요"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>요청자</h4>
          <v-text-field
            outlined
            dense
            placeholder="요청자를 입력해주세요"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <h4>접수 상태</h4>
          <v-select outlined />
        </v-col>
        <v-col cols="12" sm="2">
          <h4>제조 진행사항</h4>
          <v-select outlined />
        </v-col>
        <v-col cols="12" sm="2">
          <h4>출하 사항</h4>
          <v-select outlined />
        </v-col>
      </v-row>
    </div>
    <div class="wrapperEnd">
      <v-card-actions>
        <v-btn depressed @click="reset">초기화</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="search">검색</v-btn>
      </v-card-actions>
    </div>
    <div class="wrapperSpace">
      <div>
        <h4 class="mt-4 mb-2">요청 내역</h4>
      </div>
    </div>
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/sampleRequest";
import RealGrid from "@/components/RealGrid.vue";

export default {
  data() {
    return {
      grid: "searchProces",
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
      console.log("newSample");
      this.$emit("newSample");
    },
    reset() {},
    search() {},
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss">
.searchProcess {
  .v-input__slot {
    width: 100% !important;
  }
  .v-text-field__details {
    display: none;
  }
}
</style>
