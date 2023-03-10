<template>
  <div class="reportDetail">
    <v-row class="px-2">
      <v-col cols="12" sm="2">
        <h4>Lot No</h4>
        <v-text-field
          outlined
          dense
          disabled
          filled
          :value="this.data.lot_no"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>Code Grade</h4>
        <v-text-field outlined dense disabled filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>수량(Qty)</h4>
        <v-text-field outlined dense disabled filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>출하예정일</h4>
        <v-text-field outlined dense disabled filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>요청처</h4>
        <v-text-field outlined dense disabled filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>요청인</h4>
        <v-text-field outlined dense disabled filled></v-text-field>
      </v-col>
    </v-row>
    <v-row class="px-2">
      <v-col cols="12" sm="12">
        <h4>조성</h4>
        <v-text-field outlined dense disabled filled></v-text-field>
      </v-col>
    </v-row>
    <h3 class="mt-16 mb-2">세부정보</h3>
    <hr class="mb-8" />
    <!-- <RealGrid :domName="grid" ref="reportDetailGrid" :settings="settings" /> -->
    <v-row style="height: 90px" class="px-2">
      <!-- <v-col cols="12" sm="3">
        <h4>제품 무게</h4>
        <v-text-field outlined dense filled disabled></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>제조용기 무게</h4>
        <v-text-field outlined dense filled disabled></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>제품 최종 총 무게</h4>
        <v-text-field outlined dense filled disabled></v-text-field>
      </v-col> -->
      <v-col cols="12" sm="3">
        <h4>포장 용기</h4>
        <v-select
          :items="this.rmAll(code.C)"
          v-model="param.packing"
          placeholder="선택해주세요"
          outlined
          id="work"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>라벨기재사항</h4>
        <v-text-field outlined dense></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>배송방법</h4>
        <v-select
          :items="this.rmAll(code.D)"
          v-model="param.delivery_type"
          placeholder="선택해주세요"
          outlined
          id="work"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>분석 특이사항</h4>
        <v-text-field outlined dense></v-text-field>
      </v-col>
    </v-row>
    <v-row style="height: 90px" class="px-2">
      <v-col cols="12" sm="3">
        <h4>고객요청 특이사항</h4>
        <v-text-field outlined dense class="pr-2"></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>제조상 특이사항</h4>
        <v-text-field outlined dense></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>포장 및 배송관련 특이사항</h4>
        <v-text-field outlined dense placeholder="(kg)"></v-text-field>
      </v-col>
    </v-row>
    <v-row style="height: 90px" class="px-2"> </v-row>
    <div class="wrapper">
      <v-card-actions>
        <v-btn depressed @click="reset">취소</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="save">완료 </v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script>
// import RealGrid from "@/components/RealGrid.vue";
import { mapState } from "vuex";
import * as settings from "@/assets/grid/reportDetail";
export default {
  props: ["data"],
  data() {
    return {
      grid: "reportDetail",
      param: {},
      settings,
    };
  },
  methods: {
    reset() {},
    save() {},
  },
  components: {
    // RealGrid,
  },
  computed: {
    ...mapState("common", ["code"]),
  },
};
</script>
<style lang="scss">
.reportDetail {
  .v-input__slot {
    width: 100%;
  }
}
</style>
