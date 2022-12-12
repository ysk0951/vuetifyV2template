<template>
  <div>
    <h3 class="mt-4 mb-2">회원 마스터 관리</h3>
    <hr class="mb-4" />
    <div class="confirmSample wrapperSpace">
      <v-row>
        <v-col cols="12" sm="2">
          <h4>이름</h4>
          <v-text-field
            outlined
            dense
            placeholder="이름을 입력해주세요"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <h4>기업명</h4>
          <v-text-field
            outlined
            dense
            placeholder="기업명을 입력해주세요"
          ></v-text-field>
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
    <h3 class="mt-16 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">목록</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
  </div>
</template>
<script>
import { columns, fields, height } from "@/assets/grid/userMaster";
import RealGrid from "@/components/RealGrid.vue";
export default {
  data() {
    return {
      grid: "userMaster",
      settings: {
        columns,
        fields,
        height,
      },
    };
  },
  methods: {
    newSample() {
      console.log("newSample");
      this.$emit("newSample");
    },
    search() {},
    reset() {},
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss">
.confirmSample {
  .v-text-field__details {
    display: none;
  }
}
</style>
